import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Autocomplete,
  CircularProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { questionService } from "../../../services/questionService";
import demoQuestions from "../../../data/demoQuestions";

export default function CreateQuestion({ onSuccess, guardians = [] }) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { createQuestion } = questionService;
  console.log(guardians);
  const [questions, setQuestions] = useState(demoQuestions);
  const [guardianIds, setGuardianIds] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else if (user?.role !== "paper-setter") {
      navigate("/unauthorized");
    }
  }, [isAuthenticated, user, navigate]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctOption: "" },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[index].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("Validating form data");
      // Validations
      for (const question of questions) {
        if (!question.question.trim()) {
          throw new Error("All questions are required");
        }
        if (question.options.some((opt) => !opt.trim())) {
          throw new Error("All options are required for each question");
        }
        if (question.options.length === 4 && !question.correctOption) {
          throw new Error(
            "Correct option is required when all options are provided"
          );
        }
      }
      if (guardianIds.length !== 3) {
        throw new Error("Please select exactly 3 guardians");
      }

      console.log("Submitting questions");
      const questionData = {
        questions: questions,
        guardianIds: guardianIds,
      };
      await createQuestion(questionData);
      console.log("Questions submitted successfully");
      setSuccess(true);
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting questions:", error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Alert severity="success">
        Questions created successfully! Key shares have been sent to the
        selected guardians.
      </Alert>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Create Questions
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <Accordion key={index} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Question {index + 1}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <TextField
                  fullWidth
                  label={`Question ${index + 1}`}
                  multiline
                  rows={2}
                  value={q.question}
                  onChange={(e) =>
                    handleQuestionChange(index, "question", e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
                {q.options.map((option, optionIndex) => (
                  <TextField
                    key={optionIndex}
                    fullWidth
                    label={`Option ${optionIndex + 1}`}
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, optionIndex, e.target.value)
                    }
                    sx={{ mb: 2 }}
                  />
                ))}
                {q.options.length === 4 && (
                  <TextField
                    fullWidth
                    select
                    value={q.correctOption}
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        "correctOption",
                        e.target.value
                      )
                    }
                    SelectProps={{
                      native: true,
                    }}
                    sx={{ mb: 2 }}
                  >
                    <option value="">Select correct option</option>
                    {q.options.map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </TextField>
                )}
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveQuestion(index)}
                >
                  Remove Question
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
        <Button variant="contained" onClick={handleAddQuestion} sx={{ mb: 2 }}>
          Add Another Question
        </Button>

        <Autocomplete
          multiple
          options={guardians}
          getOptionLabel={(option) => `${option.name} (${option.email})`}
          value={guardians.filter((g) => guardianIds.includes(g._id))}
          onChange={(_, newValue) => setGuardianIds(newValue.map((g) => g._id))}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Guardians (exactly 3)"
              error={guardianIds.length > 0 && guardianIds.length !== 3}
              helperText={
                guardianIds.length > 0 && guardianIds.length !== 3
                  ? "Please select exactly 3 guardians"
                  : ""
              }
            />
          )}
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" disabled={loading} fullWidth>
          {loading ? <CircularProgress size={24} /> : "Submit Questions"}
        </Button>
      </Box>
    </Paper>
  );
}
