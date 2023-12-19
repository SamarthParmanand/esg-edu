"use client";

import { useEffect, useState } from "react";
import { Button, TextField, Box, Typography, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ESG from "@/lib/esg-helper";

const Home = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await ESG.supabase.from("question_context").select();
        if (data && data.length > 0) {
          setQuestions(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const hasMoreThan300Words = (text) => {
    const words = text.trim().split(/\s+/);
    return words.length >= 300;
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (!hasMoreThan300Words(value)) {
      setCurrentAnswer(value);
    }
  };

  const handleNext = () => {
    setUserAnswers((prevAnswers) => [...prevAnswers, { id: questions[currentQuestionIndex].id, answer: currentAnswer }]);
    setCurrentAnswer("");
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    setUserAnswers((prevAnswers) => prevAnswers.slice(0, -1));
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSkip = () => {
    setUserAnswers((prevAnswers) => [...prevAnswers, { id: questions[currentQuestionIndex].id, answer: "" }]);
    setCurrentAnswer("");
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "60%",
          padding: "3rem",
          border: "1px solid #ddd",
          borderRadius: "20px",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
          "@media(max-width: 600px)": {
            width: "90%",
          },
        }}
      >
        {questions.length > 0 && currentQuestionIndex < questions.length && (
          <>
            <Typography variant="h5" sx={{ color: "#0e0d0dde", marginBottom: "2rem", fontWeight: "bold", fontStyle: "Inter, sans-serif" }}>
              {questions[currentQuestionIndex].question}
            </Typography>
            <Typography sx={{ color: "#6d7073", marginBottom: "3rem", fontStyle: "Inter, sans-serif" }}>{questions[currentQuestionIndex].description}</Typography>
            <TextField
              multiline={true}
              rows={12}
              placeholder="Type your answer : "
              variant="outlined"
              fullWidth
              value={currentAnswer}
              onChange={handleInputChange}
              sx={{ marginBottom: "3rem", backgroundColor: "white", borderRadius: "10px" }}
              maxLength={10}
            />
          </>
        )}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={handleBack} disabled={currentQuestionIndex === 0} sx={{ backgroundColor: "#6366F1", borderRadius: "10px " }}>
            Back
          </Button>
          {questions.length > 0 && currentQuestionIndex < questions.length - 1 ? (
            currentAnswer.trim() === "" ? (
              <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={handleSkip} sx={{ backgroundColor: "#6366F1", borderRadius: "10px " }}>
                Skip
              </Button>
            ) : (
              <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={handleNext} sx={{ backgroundColor: "#6366F1", borderRadius: "10px " }}>
                Next
              </Button>
            )
          ) : (
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={() => {
                console.log("Now you can redirect.");
              }}
              sx={{ backgroundColor: "#6366F1", borderRadius: "10px " }}
            >
              Submit
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Home;
