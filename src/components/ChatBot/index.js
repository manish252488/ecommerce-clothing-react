import React, { useEffect, useRef, useState } from "react";
import "./index.less";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Fab,
  IconButton,
  Popover,
  TextField,
  Typography,
} from "@material-ui/core";
import Fade from "react-reveal";
import moment from 'moment';
import {
  ClearAllOutlined,
  MessageOutlined,
  PaletteOutlined,
  SendOutlined,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { addUserChat, removeChats, sendChat } from "../../store/actions";
import Pallet from "./Pallet";
export default function ChatBot(props) {
   const themes = ['default','purplin','witching'];
  const messageEl = useRef(null);
  const [text, setText] = useState("");
  const chat =  useSelector(({Chat})=> Chat.chat)
  const [error, setError] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const [paletteAnchor, setPaletteAnchor] = useState(null)
  const onChange = (val) => {
    setText(val);
  };
  const [theme,setTheme]=useState(themes[0])
  const send = async () => {
    setError("");
    if (text && text !== "") {
      dispatch(addUserChat(text))
      dispatch(sendChat(text))
      setText("")
    } else {
      setError("Empty Message!");
    }
  };
   useEffect(() => {
    if (messageEl) {
      messageEl?.current?.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [chat])
 
  const clearChat = () => {
    dispatch(removeChats())
  };

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openPalette = ev => {
    setPaletteAnchor(ev)
  }
  const handleClosePalette = () => {
    setPaletteAnchor(null)
  }
  const selectTheme = theme => {
    setTheme(theme)
  }
  return (
    <>
      <Fab
        size="large"
        color="primary"
        onClick={handleOpen}
        className="fab-custom"
      >
        <MessageOutlined color="secondary" />
      </Fab>
      <Popover
      draggable={true}
        className="menu-card"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handleClose}
        disableRestoreFocus
        keepMounted
      >
        <Card className="chat-card">
          <CardHeader
            avatar={<Avatar aria-label="recipe">C</Avatar>}
            action={<>
              <Pallet handleClose={handleClosePalette} anchor={paletteAnchor} themes={themes} handleThemeChange={selectTheme}/>
              <IconButton onClick={ev => openPalette(ev.currentTarget)}>
                <PaletteOutlined color="primary"/>
              </IconButton>
              <IconButton onClick={clearChat} color="primary">
                <ClearAllOutlined color="primary" />
              </IconButton>
              </>
            }
            title=""
            className={`header-${theme}`}
            subheader="active"
          />

          <CardContent className={`chat-panel theme-${theme}`} ref={messageEl}>
            {chat.map((val, index) => {
              if (val.user === "bot") {
                return (
                  <Fade bottom duration={50} delay={0}>
                    <div className="bot-msg" key={val.id + index}>
                      {val.message}
                      <Typography>{moment(val.time).fromNow()}</Typography>
                    </div>
                  </Fade>
                );
              } else
                return (
                  <Fade bottom duration={50} delay={0}>
                    <div className="usr-msg" key={val.id + index}>
                      {val.message}
                      <Typography>{moment(val.time).fromNow()}</Typography>
                    </div>
                  </Fade>
                );
            })}
          </CardContent>
          <CardActions>
            <TextField
              variant="outlined"
              onChange={(e) => onChange(e.target.value)}
              value={text}
              onKeyPress={(e) => (e.code === "Enter" ? send() : null)}
              fullWidth
              helperText={error}
              error={error === "" ? false : true}
            />
            <Button
              size="large"
              color="primary"
              variant="contained"
              endIcon={<SendOutlined color="secondary"/>}
              onClick={send}
            >
              send
            </Button>
          </CardActions>
        </Card>
      </Popover>
    </>
  );
}
