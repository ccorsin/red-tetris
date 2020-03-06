const params = {
  server:{
     host: '0.0.0.0',
     port: 3504,
     get url(){ return 'http://' + this.host + ':' + this.port; }
  },
};

module.exports = params;
