module.exports = async (req, res, next) => {
  const errors = [];
  const answers = req.body;

  //Create your Clean Object

  const cleaner = answer => {
    const cleanAnswer = {};
    const addProp = (prop, value) => {
      cleanAnswer[prop] = value;
    };

    !!answer.answer
      ? addProp("answer", answer.answer)
      : errors.push({ answer: "Answer is Required" });

    //Description
    !!answer.question_id
      ? addProp("question_id", answer.question_id)
      : errors.push({ question_id: "Question Id is Required" });

    //User ID
    !!req.user.userId
      ? addProp("user_id", req.user.userId)
      : errors.push({
          user_id: "User Id is Required, something is a bit shifty here..."
        });

    errors.length < 1 && addProp("answer_date", new Date());
    console.log('Clean Answers',cleanAnswer)

    //return cleanObj
    return cleanAnswer;
  };

  if (Array.isArray(answers)) {
    req.body = [];
    answers.forEach(a => {
      req.body.push(cleaner(a));
    });
  } else {

    req.body = {...cleaner(answers)};

  }

  if (errors.length > 0) {
    next(errors);
  } else {
    console.log(req.body)
    next();
  }
};
