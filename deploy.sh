# ./test.sh live
# ./test.sh test

live_site="/var/www/html/dapperfolks"

# deploy function using scp
deploy () {
    echo "starting deployement on $1"
    zip -r build.zip build/
    scp -r -o "StrictHostKeyChecking no" -i dapperfolks123.pem build.zip ec2-user@ec2-34-225-245-139.compute-1.amazonaws.com:$1 ;
    ssh -o "StrictHostKeyChecking no" -i dapperfolks123.pem ec2-user@ec2-34-225-245-139.compute-1.amazonaws.com "unzip -o $1/build.zip -d $1/ && shopt -s dotglob && cp -r $1/build/* $1 && rm -rf $1/build && rm -rf $1/build.zip && sudo service httpd restart";
    rm -rf build.zip
    echo "site deployed! $1"
}
if [ "$1" == "live" ]; then
    echo " creating Live build..."
    #creating build for live 
    yarn run build-prod
    echo "deploying to live instance:  $live_site ..."
    #deploy function called with live path parameter
    deploy $live_site
else    #if no env is mentioned
    echo "mention a test/live deployment type."
    echo "example: ./deploy.sh live/test"
fi
# end of script