( function() {

  var curp = new CURP(
    {
      paterno         : $( 'input[field=paterno]' ),
      materno         : $( 'input[field=materno]' ),
      nombres         : $( 'input[field=nombres]' ),
      curp            : $( 'input[field=curp]' ),
      sexo            : $( 'select[field=sexo]' ),
      entidad         : $( 'select[field=entidad]' ),
      fechaNacimiento : $( 'input[field=fechaNacimiento]' ),
    },
    {
      sexo: {
        h: 'MASCULINO',
        m: 'FEMENINO'
      }
    }
  );

  function switchPlaceholder( $el ) {
      var aux = $el.attr( 'placeholder' );
      $el.attr( 'placeholder', $el.attr( 'formatPlaceholder' ) );
      $el.attr( 'formatPlaceholder', aux );
  }

  // add plaholder switcher
  $( '[formatPlaceholder]' )
    .focus( function() {
      var $el = $( this );
      switchPlaceholder( $el );
    } )
    .blur( function() {
      var $el = $( this );
      switchPlaceholder( $el );
    } )

} )();
