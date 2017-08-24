(function() {
  var CURP;

  CURP = (function() {
    var curpPattern, entidades, escapeCharacters, escapeLinkers, escapeNames, escapeWords, partterns, translateCharacters;

    curpPattern = /[A-Z]{4}\d{6}[HM][A-Z]{2}[A-Z]{3}[A-Z0-9]\d/;

    partterns = [/[A-Z]{1,4}/, /\d{1,6}/, /[HM]{1}/, /[A-Z]{1,2}/, /[A-Z]{1,3}/, /[A-Z0-9]{1}/, /\d{1}/];

    translateCharacters = {
      'Á': 'A',
      'É': 'E',
      'Í': 'I',
      'Ó': 'O',
      'Ú': 'U',
      'Ü': 'U'
    };

    escapeCharacters = ['Ñ', '/', '-', '.', '\''];

    escapeNames = ['MARIA', 'MA.', 'MA', 'M.', 'M', 'JOSE', 'J.', 'J'];

    escapeLinkers = ['DA', 'DAS', 'DE', 'DEL', 'DER', 'DI', 'DIE', 'DD', 'Y', 'EL', 'LA', 'LOS', 'LAS', 'LE', 'LES', 'MAC', 'MC', 'VAN', 'VON'];

    escapeWords = ['BACA', 'BAKA', 'BUEI', 'BUEY', 'CACA', 'CACO', 'CAGA', 'CAGO', 'CAKA', 'CAKO', 'COGE', 'COGI', 'COJA', 'COJE', 'COJI', 'COJO', 'COLA', 'CULO', 'FALO', 'FETO', 'GETA', 'GUEI', 'GUEY', 'JETA', 'JOTO', 'KACA', 'KACO', 'KAGA', 'KAGO', 'KAKA', 'KAKO', 'KOGE', 'KOGI', 'KOJA', 'KOJE', 'KOJI', 'KOJO', 'KOLA', 'KULO', 'LILO', 'LOCA', 'LOCO', 'LOKA', 'LOKO', 'MAME', 'MAMO', 'MEAR', 'MEAS', 'MEON', 'MIAR', 'MION', 'MOCO', 'MOKO', 'MULA', 'MULO', 'NACA', 'NAKA', 'NACO', 'NAKO', 'PEDA', 'PEDO', 'PENE', 'PIPI', 'PITO', 'POTO', 'PUTA', 'PUTO', 'QULO', 'RATA', 'ROBA', 'ROBE', 'ROBO', 'RUIN', 'SENO', 'TETA', 'VACA', 'VAGA', 'VAGO', 'VAKA', 'VUEI', 'VUEY', 'WUEI', 'WUEY'];

    entidades = {
      AS: 'AGUASCALIENTES',
      BC: 'BAJA CALIFORNIA',
      BS: 'BAJA CALIFORNIA SUR',
      CC: 'CAMPECHE',
      CL: 'COAHUILA DE ZARAGOZA',
      CM: 'COLIMA',
      CS: 'CHIAPAS',
      CH: 'CHIHUAHUA',
      DF: 'DISTRITO FEDERAL',
      DG: 'DURANGO',
      GT: 'GUANAJUATO',
      GR: 'GUERRERO',
      HG: 'HIDALGO',
      JC: 'JALISCO',
      MC: 'MEXICO',
      MN: 'MICHOACAN DE OCAMPO',
      MS: 'MORELOS',
      NT: 'NAYARIT',
      NL: 'NUEVO LEON',
      OC: 'OAXACA',
      PL: 'PUEBLA',
      QT: 'QUERETARO DE ARTEAGA',
      QR: 'QUINTANA ROO',
      SP: 'SAN LUIS POTOSI',
      SL: 'SINALOA',
      SR: 'SONORA',
      TC: 'TABASCO',
      TS: 'TAMAULIPAS',
      TL: 'TLAXCALA',
      VZ: 'VERACRUZ',
      YN: 'YUCATAN',
      ZS: 'ZACATECAS',
      NE: 'NACIDO EN EL EXTRANJERO'
    };

    function CURP(inputs, options) {
      var ref, ref1;
      this.setPaterno(inputs != null ? inputs.paterno : void 0);
      this.setMaterno(inputs != null ? inputs.materno : void 0);
      this.setNombres(inputs != null ? inputs.nombres : void 0);
      this.setFechaNacimiento(inputs != null ? inputs.fechaNacimiento : void 0);
      this.setSexo(inputs != null ? inputs.sexo : void 0);
      this.setEntidad(inputs != null ? inputs.entidad : void 0);
      this.setCURP(inputs != null ? inputs.curp : void 0);
      this.setM(options != null ? (ref = options.sexo) != null ? ref.m : void 0 : void 0);
      this.setH(options != null ? (ref1 = options.sexo) != null ? ref1.h : void 0 : void 0);
      this.setHistory();
      this.init();
    }

    CURP.prototype.init = function() {
      var $entidad, $option, it, l, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, v;
      it = this;
      if ((ref = this.getCURP()) != null) {
        ref.attr('pattern', curpPattern.source);
      }
      $entidad = this.getEntidad();
      if ($entidad) {
        for (v in entidades) {
          l = entidades[v];
          $option = $('<option/>', {
            value: v,
            text: l
          });
          $entidad.append($option);
        }
      }
      if ((ref1 = this.getMaterno()) != null) {
        ref1.keyup(function() {
          return it.generate();
        });
      }
      if ((ref2 = this.getPaterno()) != null) {
        ref2.keyup(function() {
          return it.generate();
        });
      }
      if ((ref3 = this.getNombres()) != null) {
        ref3.keyup(function() {
          return it.generate();
        });
      }
      if ((ref4 = this.getFechaNacimiento()) != null) {
        ref4.keyup(function() {
          return it.generate();
        });
      }
      if ((ref5 = this.getSexo()) != null) {
        ref5.change(function() {
          return it.generate();
        });
      }
      if ((ref6 = this.getEntidad()) != null) {
        ref6.change(function() {
          return it.generate();
        });
      }
      if ((ref7 = this.getCURP()) != null) {
        ref7.keydown(function(e) {
          return it.editCURP(e);
        });
      }
      return (ref8 = this.getCURP()) != null ? ref8.on('update', function() {
        return it.updateInputs();
      }) : void 0;
    };

    CURP.prototype.updateInputs = function() {
      var $curp, date, flag, l, parts, re, ref, ref1, ref2, ref3, ref4, ref5, v, val, value;
      $curp = this.getCURP();
      value = $curp.val();
      re = new RegExp('(' + partterns.map(function(item, index) {
        return item.source;
      }).join(')?(') + ')?');
      parts = value.match(re).filter(function(el, index) {
        if ((el != null) && index !== 0) {
          return el;
        }
      });
      if (((ref = parts[1]) != null ? ref.length : void 0) !== 0) {
        val = parts[1];
        date = val.match(/(\d{2})?(\d{2})?(\d{2})?/).slice(1).map(function(el) {
          if (el != null) {
            return el;
          }
          return '01';
        });
        date = [date[1], date[2], date[0]];
        date = new Date(date.join('/'));
        if (isNaN(date.getFullYear())) {
          this.setHistory();
          $curp.val(value.slice(0, 4).concat('______').concat(value.substr(10)));
          return false;
        }
        if ((ref1 = this.getFechaNacimiento()) != null) {
          ref1.val(date.toJSON().slice(0, 10).split('-').reverse().join('/'));
        }
      }
      if (parts[2] != null) {
        val = parts[2];
        if (val === 'M') {
          if ((ref2 = this.getSexo()) != null) {
            ref2.val(this.getM());
          }
        }
        if (val === 'H') {
          if ((ref3 = this.getSexo()) != null) {
            ref3.val(this.getH());
          }
        }
      }
      if (((ref4 = parts[3]) != null ? ref4.length : void 0) === 2) {
        val = parts[3];
        flag = void 0;
        for (v in entidades) {
          l = entidades[v];
          if (v === val) {
            flag = true;
            break;
          }
        }
        if (flag) {
          return (ref5 = this.getEntidad()) != null ? ref5.val(val) : void 0;
        }
        return this.undo(2);
      }
    };

    CURP.prototype.editCURP = function(e) {
      var $curp, count, index, j, key, len, parttern, re, times, value;
      if (e.keyCode !== 9) {
        e.preventDefault();
      }
      if (e.keyCode === 8) {
        return this.undo();
      }
      if (e.key.length === 1) {
        key = e.key.toUpperCase();
      }
      $curp = this.getCURP();
      value = $curp.val();
      if (/[A-Z0-9]/.test(key) && value !== '') {
        index = value.indexOf('_');
        if (index === -1) {
          return e;
        }
        count = 0;
        re = void 0;
        for (j = 0, len = partterns.length; j < len; j++) {
          parttern = partterns[j];
          re = parttern;
          times = parttern.toString().match(/\{(\d),?(\d)?/);
          count += parseInt(times[2] || times[1]);
          if (index < count) {
            break;
          }
        }
        if (re.test(key)) {
          $curp.val(value.substr(0, index).concat(key).concat(value.substr(index + 1)));
          this.history().push(index);
          return $curp.trigger('update');
        }
      }
    };

    CURP.prototype.undo = function(times) {
      var i, index, j, ref, results, value;
      if (times == null) {
        times = 1;
      }
      if (this.history().length === 0) {
        return false;
      }
      results = [];
      for (i = j = 0, ref = times; j < ref; i = j += 1) {
        index = this.history().pop();
        value = this.getCURP().val();
        this.getCURP().val(value.substr(0, index).concat('_').concat(value.substr(index + 1)));
        results.push(this.getCURP().trigger('update'));
      }
      return results;
    };

    CURP.prototype.generate = function() {
      var curp;
      curp = [];
      curp.push(this.escapeBadWords());
      curp.push(this.scrapFechaNacimiento());
      curp.push(this.scrapSexo());
      curp.push(this.scrapEntidad());
      curp.push(this.scrapPaternoConsonante());
      curp.push(this.scrapMaternoConsonante());
      curp.push(this.scrapNombresConsonante());
      curp.push('__');
      return this.getCURP().val(curp.join(''));
    };

    CURP.prototype.scrapNombresConsonante = function() {
      var $el, value;
      $el = this.getNombres();
      if (!$el) {
        return 'X';
      }
      value = this.cleanText($el.val());
      return this.getConsonant(this.cleanNames(value).substr(1));
    };

    CURP.prototype.scrapMaternoConsonante = function() {
      var $el, value;
      $el = this.getMaterno();
      if (!$el) {
        return 'X';
      }
      value = this.cleanText($el.val());
      return this.getConsonant(value.slice(1));
    };

    CURP.prototype.scrapPaternoConsonante = function() {
      var $el, value;
      $el = this.getPaterno();
      if (!$el) {
        return 'X';
      }
      value = this.cleanText($el.val());
      return this.getConsonant(value.slice(1));
    };

    CURP.prototype.scrapEntidad = function() {
      var $el, k, v, value;
      $el = this.getEntidad();
      if (!$el) {
        return '__';
      }
      value = $el.val();
      for (k in entidades) {
        v = entidades[k];
        if (k === value) {
          return k;
        }
      }
      return '__';
    };

    CURP.prototype.scrapSexo = function() {
      var $el, value;
      $el = this.getSexo();
      if (!$el) {
        return '_';
      }
      value = $el.val();
      if (value === this.getM()) {
        return 'M';
      }
      if (value === this.getH()) {
        return 'H';
      }
      return '_';
    };

    CURP.prototype.scrapFechaNacimiento = function() {
      var $el, date, parts;
      $el = this.getFechaNacimiento();
      if (!$el) {
        return '______';
      }
      parts = $el.val().match(/(\d{2})\/(\d{2})\/(\d{4})/);
      if (!parts) {
        return '______';
      }
      date = new Date(parts.slice(1).reverse().join('/'));
      if (isNaN(date.getFullYear())) {
        return '______';
      }
      return date.toJSON().slice(2, 10).split('-').join('');
    };

    CURP.prototype.escapeBadWords = function() {
      var word;
      word = [];
      word.push(this.scrapPaterno());
      word.push(this.scrapMaterno());
      word.push(this.scrapNombres());
      word = word.join('');
      if (escapeWords.indexOf(word) !== -1) {
        return word.slice(0, 1) + 'X' + word.substr(2);
      }
      return word;
    };

    CURP.prototype.scrapNombres = function() {
      var $el, value;
      $el = this.getNombres();
      if (!$el) {
        return 'X';
      }
      value = this.cleanText($el.val());
      if (value.length === 0) {
        return 'X';
      }
      return this.cleanNames(value).slice(0, 1);
    };

    CURP.prototype.scrapMaterno = function() {
      var $el, value;
      $el = this.getMaterno();
      if (!$el) {
        return 'X';
      }
      value = this.cleanText($el.val());
      if (value.length === 0) {
        return 'X';
      }
      return value.slice(0, 1);
    };

    CURP.prototype.scrapPaterno = function() {
      var $el, value, vocal;
      $el = this.getPaterno();
      if (!$el) {
        return 'XX';
      }
      value = this.cleanText($el.val());
      if (value.length === 0) {
        return 'XX';
      }
      if (value.length === 1) {
        return value + 'X';
      }
      vocal = this.getVocal(value.substr(1));
      return value.slice(0, 1) + vocal;
    };

    CURP.prototype.cleanNames = function(text) {
      if (text.split(/\s+/).length === 1) {
        return text.split(/\s+/).join(' ');
      }
      return text.split(/\s+/).filter(function(name, index) {
        return escapeNames.indexOf(name) === -1;
      }).join(' ');
    };

    CURP.prototype.getConsonant = function(text) {
      var consonants;
      consonants = text.match(/[^AEIOU]/gi);
      if ((consonants != null ? consonants.length : void 0) > 0) {
        return consonants[0];
      }
      return 'X';
    };

    CURP.prototype.getVocal = function(text) {
      var vocals;
      vocals = text.match(/[AEIOU]/gi);
      if ((vocals != null ? vocals.length : void 0) > 0) {
        return vocals[0];
      }
      return 'X';
    };

    CURP.prototype.cleanText = function(text) {
      var char, j, k, len, v;
      if (text == null) {
        text = '';
      }
      text = text.toUpperCase();
      text = text.split(/\s+/).filter(function(word, index) {
        return escapeLinkers.indexOf(word) === -1;
      }).join(' ');
      for (k in translateCharacters) {
        v = translateCharacters[k];
        text = text.replace(k, v);
      }
      for (j = 0, len = escapeCharacters.length; j < len; j++) {
        char = escapeCharacters[j];
        text = text.replace(char, 'X');
      }
      return text.trim();
    };

    CURP.prototype.history = function() {
      return this._history;
    };

    CURP.prototype.setHistory = function(_history) {
      this._history = _history != null ? _history : [];
    };

    CURP.prototype.getM = function() {
      return this._M;
    };

    CURP.prototype.setM = function(_M) {
      this._M = _M != null ? _M : 'M';
    };

    CURP.prototype.getH = function() {
      return this._H;
    };

    CURP.prototype.setH = function(_H) {
      this._H = _H != null ? _H : 'H';
    };

    CURP.prototype.getMaterno = function() {
      return this._materno;
    };

    CURP.prototype.setMaterno = function(_materno) {
      this._materno = _materno != null ? _materno : void 0;
    };

    CURP.prototype.getPaterno = function() {
      return this._paterno;
    };

    CURP.prototype.setPaterno = function(_paterno) {
      this._paterno = _paterno != null ? _paterno : void 0;
    };

    CURP.prototype.getNombres = function() {
      return this._nombres;
    };

    CURP.prototype.setNombres = function(_nombres) {
      this._nombres = _nombres != null ? _nombres : void 0;
    };

    CURP.prototype.getCURP = function() {
      return this._curp;
    };

    CURP.prototype.setCURP = function(_curp) {
      this._curp = _curp != null ? _curp : void 0;
    };

    CURP.prototype.getFechaNacimiento = function() {
      return this._fechaNacimiento;
    };

    CURP.prototype.setFechaNacimiento = function(_fechaNacimiento) {
      this._fechaNacimiento = _fechaNacimiento != null ? _fechaNacimiento : void 0;
    };

    CURP.prototype.getSexo = function() {
      return this._sexo;
    };

    CURP.prototype.setSexo = function(_sexo) {
      this._sexo = _sexo != null ? _sexo : void 0;
    };

    CURP.prototype.getEntidad = function() {
      return this._entidad;
    };

    CURP.prototype.setEntidad = function(_entidad) {
      this._entidad = _entidad != null ? _entidad : void 0;
    };

    return CURP;

  })();

  if (typeof window !== "undefined" && window !== null) {
    window.CURP = CURP;
  }

}).call(this);
