let STORE = {
    view: 'intro', 
    count: 0,  
    score : 0
  };
  
  const questions = [
    {
        question: "What is 1 + 1?",
        options: [
            "1",
            "2",
            "3",
            "4"
        ],
        correctAnswer: "2"
    },
    {
        question: "What is 2 + 2?",
        options: [
            "2",
            "3",
            "4",
            "5"
        ],
        correctAnswer: "4"
    },
    {
        question: "What is 3 + 3?",
        options: [
            "3",
            "4",
            "5",
            "6"
        ],
        correctAnswer: "6"
    },
    {
        question: "What is 1 + 4?",
        options: [
            "4",
            "5",
            "6",
            "7"
        ],
        correctAnswer: "5"
    },
    {
        question: "What is 3 + 5?",
        options: [
            "5",
            "6",
            "7",
            "8"
        ],
        correctAnswer: "8"
    }
  ]; 
  
  function submitForm(){
    $("form#answerForm").on("submit", function(e){
      e.preventDefault();
        if(STORE.view === 'intro'){
          createQuestion(); 
        } else if(STORE.view === 'question'){
          validateQuestion();
        } else if(STORE.view === 'end'){
          reset();
        } else if(STORE.view === 'results'){
          STORE.count += 1; 
          if(STORE.count === 5){
            viewFinalPage(); 
          } else {
            createQuestion(); 
          }
        }
    }); 
  }
  
  function viewFinalPage(){
    STORE.view = 'end'
    $('.response').html(`End!<div>You got ${STORE.score} out of 5 right.</div>`)
    $('button').text("Restart");
    $('#score').hide();
    $('#currentQuestionDisplay').hide();
  }
  
  function createQuestion(){ 
    STORE.view = 'question';
    let v = STORE.count + 1;
    $("#intro").hide();
    $(".possible-answers").show();
    $(".response").html("");
    $("#currentQuestionDisplay").show();
    $("#val2").html(v);
    $("#currentQuestion").html(questions[STORE.count].question);  
    let html = ""; 
    questions[STORE.count].options.forEach( (val, ind) => {
      html += `<input type="radio" name="possible-answer" id="${ind}" value=${val} role="radio"><label for="${ind}"> ${val}</label></input></br>`; 
    }); 
    $(".possible-answers").html(html); 
    $("button").text("Submit"); 
    $("#currentQuestion").show();
    $("#score").show();
  };
  
  function validateQuestion() {
  if (!$("input[type='radio']:checked").val()) {
    alert('Must pick an answer!');
  } else {
    checkQuestion()
  }
  }
  
  function checkQuestion(){
    STORE.view = 'results';  
    let chosen = $("input:checked");
    $("#currentQuestion").hide(); 
    $(".possible-answers").hide();
    let correct = questions[STORE.count].correctAnswer == chosen.val(); 
    
    if (correct){
      $(".response").html("Correct!"); 
      STORE.score += 1; 
      $("#score").children(".val").html(STORE.score); 
    } else {
       $('.response').html(`Wrong answer.<div>The right answer is ${questions[STORE.count].correctAnswer}.</div>`);
    }
  
    $("button").text("Next"); 
  }
  
  function reset() {
    STORE.count = 0;
    STORE.score = 0;
    $('.val').html("0");
    createQuestion();
  }
  
  $(function(){
    submitForm();
  });
