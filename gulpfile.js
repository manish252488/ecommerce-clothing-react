var gulp = require('gulp');
var argv = require('yargs').argv; 
var env = argv.env || 'test';
const cloudfront = require('gulp-cloudfront-invalidate');
const exec = require('gulp-exec');
console.log(env)
const envConfig = {
    s3: {
        live: 'dapperfolks.in',
        test: 'test.dapperfolks.in',
    }
};
var config = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

var s3 = require('gulp-s3-upload')(config);



gulp.task("upload", function () {

    let settings = {
        distribution: envConfig.cloudfront[env], // Cloudfront distribution ID
        paths: ['/*'], // Paths to invalidate
        accessKeyId: config.accessKeyId, // AWS Access Key ID
        secretAccessKey: config.secretAccessKey, // AWS Secret Access Key
        wait: true // Whether to wait until invalidation is completed (default: false)
    };

    let options = {
        continueOnError: false, // default = false, true means don't emit error event
        pipeStdout: true
    };

    let reportOptions = {
        err: true, // default = true, false means don't write err
        stderr: true, // default = true, false means don't write stderr
        stdout: true // default = true, false means don't write stdout
    };

    return gulp.src("./public/**")
        .pipe(s3({
            Bucket: envConfig.s3[env], //  Required
            ACL: 'public-read' //  Needs to be user-defined
        }, {
            // S3 Constructor Options, ie:
            maxRetries: 5
        }))
        .pipe(exec(`aws s3 cp s3://${ envConfig.s3[env] }/assets s3://${ envConfig.s3[env] }/bower_components --cache-control max-age=86400 --recursive`, options))
        .pipe(exec.reporter(reportOptions))
        .pipe(exec(`aws s3 cp s3://${ envConfig.s3[env] }/img s3://${ envConfig.s3[env] }/fonts --cache-control max-age=86400 --recursive`, options))
        .pipe(exec.reporter(reportOptions))
        .pipe(cloudfront(settings));

});

gulp.task('build', gulp.series(
    ['clean'], ['create-config'], ['lint', 'copy-html-files', 'copy-fonts', 'copy-bower-components', 'html', 'robots', 'route-access', 'copy-img-files', 'copy-chat-files', 'copy-thirdparty'], ['minify-js'], ['minify-css'], ['replace-version']
));
