import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import { Map } from "react-lodash";
const CommonTable = (props) => {
  const { columns, datasource } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
        <Map
          collection={columns}
          iteratee={(obj, key) => (
            <TableCell style={{fontWeight: 700}} key={`${obj}-${key}`} align="left">
              {obj}
            </TableCell>
          )}
        />
        </TableRow>
      </TableHead>
      <TableBody>
        {datasource.map((data,index) => (
          <TableRow key={index}>
          <Map
          collection={columns}
          iteratee={(obj, key) => (
            <TableCell style={{textTransform: 'capitalize'}} key={`${obj}-${key}`} align="left">
              {data[key]}
            </TableCell>
          )}
        />
        </TableRow>))}
      </TableBody>
    </Table>
  );
};

Table.propTypes = {
  columns: PropTypes.array,
  datasource: PropTypes.array,
};

Table.defaultProps = {
  columns: [],
  datasource: [],
};
export default CommonTable;
// data source

/**
 *
 * columns: [column1,column2,....],
 *
 * columnData:[
 * [
 * column1: "data",
 * column2: "data"
 * ...
 * column(n): "data"
 * ],.....
 * ]
 *
 *
 */
