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

} )();
