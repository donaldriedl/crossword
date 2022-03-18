var app = new Vue({
  el: '#app',
  data: {
    columns: 0,
    rows: 0,
    date: "",
    years: {},
    months: {},
    days: [],
    data: [],
    numbers: [],
    display: [],
    acrossClues: [],
    downClues: [],
    availableYears: [],
    availableMonths: [],
    availableDays: [],
    inputYear: "",
    inputMonth: "",
    inputDay: "",
    rawCrosswordData: {},
    answers: false
  },

  methods: {
    userInput: function(positionNumber) {
      if(this.data[positionNumber] != "."){
        window.addEventListener("keydown", function keyPress(e) {
          if("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(String.fromCharCode(e.keyCode))){
            var tempGrid = app.display;
            tempGrid[positionNumber] = String.fromCharCode(e.keyCode).toUpperCase();
            app.display = tempGrid;
            app.display.pop();
            app.display.push("");
          } else if(e.keyCode == 8 || e.keyCode == 46) {
            var tempGrid = app.display;
            tempGrid[positionNumber] = "";
            app.display = tempGrid;
            app.display.pop();
            app.display.push("");
          }
          window.removeEventListener("keydown", keyPress);
        });
      }
    },

    getMonths: function() {
      fetch("http://localhost:8080/dates/" + this.inputYear).then((response) => {
      response.json().then((dataFromServer) => {
        this.availableMonths = dataFromServer;
        this.availableDays = [];
        this.inputMonth = "";
        this.inputDay = "";
      });
    });
    },

    getDays: function() {
      if(this.inputMonth){
        fetch("http://localhost:8080/dates/" + this.inputYear + "/" + this.inputMonth).then((response) => {
          response.json().then((dataFromServer) => {
            this.availableDays = dataFromServer;
            this.inputDay = "";
          });
        });
      } else {
        this.inputDay = "";
        this.availableDays = [];
      }
    },

    updatePuzzle: function() {
      if(this.inputYear) {
        if(this.inputMonth) {
          if(this.inputDay) {
            // Year, month and day provided
            path = encodeURIComponent(this.inputYear) + "/" + encodeURIComponent(this.inputMonth) + 
              "/" + encodeURIComponent(this.inputDay);
          } else {
            // Year and month provided
            path = encodeURIComponent(this.inputYear) + "/" + encodeURIComponent(this.inputMonth);
          }
        } else {
          // Year provided
          path = encodeURIComponent(this.inputYear);
        }
      } else {
        // No data provided
        path = "";
      }
      fetch("http://localhost:8080/crosswords/" + path).then((response) => {
        response.json().then((dataFromServer) => {
          this.rawCrosswordData = dataFromServer;
          this.data = this.rawCrosswordData["grid"];
          this.rows = this.rawCrosswordData["rows"];
          this.columns = this.rawCrosswordData["columns"];
          this.numbers = this.rawCrosswordData["gridnums"].split("!&");
          this.acrossClues = this.rawCrosswordData["acrossClues"].split("!&");
          this.downClues = this.rawCrosswordData["downClues"].split("!&");
          this.date = this.rawCrosswordData["month"] + "/" + this.rawCrosswordData["day"] + "/" + this.rawCrosswordData["year"];
          this.display = [];
          for(var i = 0; i < (this.rows * this.columns + 1); i++){
            this.display.push("");
          }
        });
      });
    },

    toggleAnswers: function() {
      if(this.answers) {
        this.answers = false;
      } else {
        this.answers = true;
      }
    }
  },

  created: function() {
    console.log("App is loaded and ready.");

    this.updatePuzzle();
    fetch("http://localhost:8080/dates").then((response) => {
      response.json().then((dataFromServer) => {
        this.availableYears = dataFromServer;
      });
    });
  }
});