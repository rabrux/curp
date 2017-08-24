class CURP

  curpPattern = /[A-Z]{4}\d{6}[HM][A-Z]{2}[A-Z]{3}[A-Z0-9]\d/

  partterns = [
    /[A-Z]{1,4}/
    /\d{1,6}/
    /[HM]{1}/
    /[A-Z]{1,2}/
    /[A-Z]{1,3}/
    /[A-Z0-9]{1}/
    /\d{1}/
  ]

  translateCharacters = {
    'Á': 'A'
    'É': 'E'
    'Í': 'I'
    'Ó': 'O'
    'Ú': 'U'
    'Ü': 'U'
  }

  escapeCharacters = [
    'Ñ'
    '/'
    '-'
    '.'
    '\''
  ]

  escapeNames = [
    'MARIA'
    'MA.'
    'MA'
    'M.'
    'M'
    'JOSE'
    'J.'
    'J'
  ]

  escapeLinkers = [
    'DA'
    'DAS'
    'DE'
    'DEL'
    'DER'
    'DI'
    'DIE'
    'DD'
    'Y'
    'EL'
    'LA'
    'LOS'
    'LAS'
    'LE'
    'LES'
    'MAC'
    'MC'
    'VAN'
    'VON'
  ]

  escapeWords = [
    'BACA'
    'BAKA'
    'BUEI'
    'BUEY'
    'CACA'
    'CACO'
    'CAGA'
    'CAGO'
    'CAKA'
    'CAKO'
    'COGE'
    'COGI'
    'COJA'
    'COJE'
    'COJI'
    'COJO'
    'COLA'
    'CULO'
    'FALO'
    'FETO'
    'GETA'
    'GUEI'
    'GUEY'
    'JETA'
    'JOTO'
    'KACA'
    'KACO'
    'KAGA'
    'KAGO'
    'KAKA'
    'KAKO'
    'KOGE'
    'KOGI'
    'KOJA'
    'KOJE'
    'KOJI'
    'KOJO'
    'KOLA'
    'KULO'
    'LILO'
    'LOCA'
    'LOCO'
    'LOKA'
    'LOKO'
    'MAME'
    'MAMO'
    'MEAR'
    'MEAS'
    'MEON'
    'MIAR'
    'MION'
    'MOCO'
    'MOKO'
    'MULA'
    'MULO'
    'NACA'
    'NAKA'
    'NACO'
    'NAKO'
    'PEDA'
    'PEDO'
    'PENE'
    'PIPI'
    'PITO'
    'POTO'
    'PUTA'
    'PUTO'
    'QULO'
    'RATA'
    'ROBA'
    'ROBE'
    'ROBO'
    'RUIN'
    'SENO'
    'TETA'
    'VACA'
    'VAGA'
    'VAGO'
    'VAKA'
    'VUEI'
    'VUEY'
    'WUEI'
    'WUEY'
  ]

  entidades = {
    AS : 'AGUASCALIENTES'
    BC : 'BAJA CALIFORNIA'
    BS : 'BAJA CALIFORNIA SUR'
    CC : 'CAMPECHE'
    CL : 'COAHUILA DE ZARAGOZA'
    CM : 'COLIMA'
    CS : 'CHIAPAS'
    CH : 'CHIHUAHUA'
    DF : 'DISTRITO FEDERAL'
    DG : 'DURANGO'
    GT : 'GUANAJUATO'
    GR : 'GUERRERO'
    HG : 'HIDALGO'
    JC : 'JALISCO'
    MC : 'MEXICO'
    MN : 'MICHOACAN DE OCAMPO'
    MS : 'MORELOS'
    NT : 'NAYARIT'
    NL : 'NUEVO LEON'
    OC : 'OAXACA'
    PL : 'PUEBLA'
    QT : 'QUERETARO DE ARTEAGA'
    QR : 'QUINTANA ROO'
    SP : 'SAN LUIS POTOSI'
    SL : 'SINALOA'
    SR : 'SONORA'
    TC : 'TABASCO'
    TS : 'TAMAULIPAS'
    TL : 'TLAXCALA'
    VZ : 'VERACRUZ'
    YN : 'YUCATAN'
    ZS : 'ZACATECAS'
    NE : 'NACIDO EN EL EXTRANJERO'
  }

  constructor : ( inputs, options ) ->

    # load inputs
    @setPaterno   inputs?.paterno
    @setMaterno   inputs?.materno
    @setNombres   inputs?.nombres
    @setFechaNacimiento inputs?.fechaNacimiento
    @setSexo    inputs?.sexo
    @setEntidad   inputs?.entidad
    @setCURP    inputs?.curp

    # load options
    @setM options?.sexo?.m
    @setH options?.sexo?.h

    # init history
    @setHistory()

    # attach event listeners
    @init()

  init : ->
    it = @

    # set pattern to curp input
    @getCURP()?.attr 'pattern', curpPattern.source

    # init select for entidades federativas
    $entidad = @getEntidad()
    if $entidad 
      for v, l of entidades
        $option = $ '<option/>',
          value : v
          text  : l
        $entidad.append $option

    @getMaterno()?.keyup( -> it.generate() )
    @getPaterno()?.keyup( -> it.generate() )
    @getNombres()?.keyup( -> it.generate() )
    @getFechaNacimiento()?.keyup( -> it.generate() )
    @getSexo()?.change( -> it.generate() )
    @getEntidad()?.change( -> it.generate() )

    @getCURP()?.keydown( ( e ) -> it.editCURP( e ) )
    @getCURP()?.on( 'update', -> it.updateInputs() )

  updateInputs: ->
    $curp = @getCURP()
    value = $curp.val()

    # generates regexp to scrap curp parts
    re = new RegExp '(' + partterns.map( ( item, index ) -> return item.source ).join( ')?(' ) + ')?'

    parts = value.match( re ).filter ( el, index ) -> return el if el? and index isnt 0

    # born date
    if parts[1]?.length isnt 0
      val = parts[1]
      date = val.match( /(\d{2})?(\d{2})?(\d{2})?/ ).slice( 1 ).map ( el ) -> 
        return el if el?
        '01'

      date = [
        date[1]
        date[2]
        date[0]
      ]

      date = new Date date.join '/'
      if isNaN( date.getFullYear() )
        @setHistory()
        $curp.val value.slice( 0, 4 ).concat( '______' ).concat value.substr( 10 )
        return false

      @getFechaNacimiento()?.val date.toJSON().slice( 0, 10 ).split( '-' ).reverse().join '/'

    # gender
    if parts[2]?
      val = parts[2]
      @getSexo()?.val @getM() if val is 'M'
      @getSexo()?.val @getH() if val is 'H'

    # entidad
    if parts[3]?.length is 2
      val  = parts[3]
      flag = undefined
      for v, l of entidades
        if v is val
          flag = true
          break

      return @getEntidad()?.val val if flag

      @undo 2

  editCURP: ( e ) ->

    # escape tab
    e.preventDefault() if e.keyCode isnt 9

    # backspace
    return @undo() if e.keyCode is 8

    key = e.key.toUpperCase() if e.key.length is 1

    $curp = @getCURP()
    value = $curp.val()

    if /[A-Z0-9]/.test( key ) and value isnt ''
      index = value.indexOf '_'
      return e if index is -1

      # eval curp by parts
      count = 0
      re    = undefined
      for parttern in partterns
        re    = parttern
        times = parttern.toString().match /\{(\d),?(\d)?/
        count += parseInt times[2] || times[1]
        break if index < count

      if re.test( key )
        $curp.val value.substr( 0, index ).concat( key ).concat( value.substr( index + 1 ) )
        @history().push index
        $curp.trigger 'update'

  undo: ( times = 1 ) ->
    return false if @history().length is 0
    for i in [0...times] by 1
      index = @history().pop()
      value = @getCURP().val()
      @getCURP().val value.substr( 0, index ).concat( '_' ).concat( value.substr( index + 1 ) )
      @getCURP().trigger 'update'
    

  generate: ->
    curp = []
    curp.push @escapeBadWords()
    curp.push @scrapFechaNacimiento()
    curp.push @scrapSexo()
    curp.push @scrapEntidad()
    curp.push @scrapPaternoConsonante()
    curp.push @scrapMaternoConsonante()
    curp.push @scrapNombresConsonante()

    curp.push '__'

    @getCURP().val curp.join ''

  scrapNombresConsonante: ->
    $el = @getNombres()
    return 'X' if not $el

    value = @cleanText $el.val()
    @getConsonant @cleanNames( value ).substr( 1 )

  scrapMaternoConsonante: ->
    $el = @getMaterno()
    return 'X' if not $el
    
    value = @cleanText $el.val()
    @getConsonant value.slice( 1 )

  scrapPaternoConsonante: ->
    $el = @getPaterno()
    return 'X' if not $el

    value = @cleanText $el.val()
    @getConsonant value.slice( 1 )

  scrapEntidad: ->
    $el = @getEntidad()
    return '__' if not $el

    value = $el.val()

    for k, v of entidades
      return k if k is value

    '__'
    

  scrapSexo: ->
    $el = @getSexo()
    return '_' if not $el

    value = $el.val()

    return 'M' if value is @getM()
    return 'H' if value is @getH()

    '_'

  scrapFechaNacimiento: ->
    $el = @getFechaNacimiento()
    return '______' if not $el

    parts = $el.val().match /(\d{2})\/(\d{2})\/(\d{4})/
    return '______' if not parts

    date = new Date parts.slice( 1 ).reverse().join( '/' )
    return '______' if isNaN( date.getFullYear() )
    
    date.toJSON().slice( 2, 10 ).split( '-' ).join ''

  escapeBadWords: ->
    word = []
    word.push @scrapPaterno()
    word.push @scrapMaterno()
    word.push @scrapNombres()
    word = word.join ''
    
    return word.slice( 0, 1 ) + 'X' + word.substr( 2 ) if escapeWords.indexOf( word ) isnt -1
    word

  scrapNombres : ->
    $el = @getNombres()
    return 'X' if not $el

    value = @cleanText $el.val()

    return 'X' if value.length is 0

    @cleanNames( value ).slice 0, 1

  scrapMaterno : ->
    $el = @getMaterno()
    return 'X' if not $el

    value = @cleanText $el.val()

    return 'X' if value.length is 0

    value.slice( 0, 1 )

  scrapPaterno : ->
    $el = @getPaterno()
    return 'XX' if not $el

    value = @cleanText $el.val()

    return 'XX' if value.length is 0
    return value + 'X' if value.length is 1

    vocal = @getVocal value.substr 1

    value.slice( 0, 1 ) + vocal

  cleanNames: ( text ) ->
    return text.split( /\s+/ ).join ' ' if text.split( /\s+/ ).length is 1
    text
      .split( /\s+/ ).filter ( name, index ) -> 
        escapeNames.indexOf( name ) is -1
      .join( ' ' )

  getConsonant: ( text ) ->
    consonants = text.match /[^AEIOU]/gi
    return consonants[0] if consonants?.length > 0
    'X'

  getVocal : ( text ) ->
    vocals = text.match /[AEIOU]/gi
    return vocals[0] if vocals?.length > 0
    'X'

  # clean text escapeCharacters, translateCharacters
  cleanText : ( text = '' ) ->
    text = text.toUpperCase()

    # escale linkers
    text = text.split( /\s+/ ).filter( ( word, index ) -> escapeLinkers.indexOf( word ) is -1 ).join ' '

    for k, v of translateCharacters
      text = text.replace k, v

    for char in escapeCharacters
      text = text.replace char, 'X'

    text.trim()

  # history getters and setters
  history : -> @_history
  setHistory : ( @_history = [] ) ->

  # gender getters and setters
  getM : -> @_M
  setM : ( @_M = 'M' ) ->

  getH : -> @_H
  setH : ( @_H = 'H' ) ->

  # inputs getters and setters
  getMaterno : -> @_materno
  setMaterno : ( @_materno = undefined ) ->

  getPaterno : -> @_paterno
  setPaterno : ( @_paterno = undefined ) ->

  getNombres : -> @_nombres
  setNombres : ( @_nombres = undefined ) ->

  getCURP : -> @_curp
  setCURP : ( @_curp = undefined ) ->

  getFechaNacimiento : -> @_fechaNacimiento
  setFechaNacimiento : ( @_fechaNacimiento = undefined ) ->

  getSexo : -> @_sexo
  setSexo : ( @_sexo = undefined ) ->

  getEntidad : -> @_entidad
  setEntidad : ( @_entidad = undefined ) ->


window.CURP = CURP if window?

