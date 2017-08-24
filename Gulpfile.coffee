gulp   = require 'gulp'
watch  = require 'gulp-watch'
coffee = require 'gulp-coffee'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'
del    = require 'del'

gulp.task 'clean', ->

  del.sync [ 'dist' ]

gulp.task 'build', ->

  gulp
    .src 'src/*.coffee'
    .pipe coffee().on( 'error', ( err ) ->
      console.log err
      @emit 'end'
    )
    .pipe gulp.dest( 'dist' )
    .pipe uglify()
    .pipe rename( { suffix: ".min" } )
    .pipe gulp.dest( 'dist' )

gulp.task 'watch', ->

  gulp.watch [ 'src/*.coffee' ], [ 'build' ]

gulp.task 'default', [ 
  'clean'
  'build'
  'watch'
]