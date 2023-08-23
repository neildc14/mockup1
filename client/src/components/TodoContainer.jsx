import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import TodoSection from "./TodoSection";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import HTTPRequest from "../services/HTTPRequest";

const TodoContainer = () => {
  const [task, setTask] = useState("");
  const [time, setTime] = useState("");
  const [method, setMethod] = useState("post");
  const [todo, setTodo] = useState({});
  const toast = useToast();

  const http = new HTTPRequest();
  const queryClient = useQueryClient();

  const onHandleChangeTask = (e) => {
    e.preventDefault();
    setTask(e.target.value);
  };

  const onHandleChangeTime = (e) => {
    e.preventDefault();
    setTime(e.target.value);
  };

  const mutation = useMutation({
    mutationFn: (newTodo) => {
      method === "post" ? http.postTodo(newTodo) : http.putTodo(newTodo);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      toast({
        title:
          method === "post"
            ? "Todo created successfully."
            : "Todo update successfully",
        description:
          method === "post"
            ? "We've created your todo fo you."
            : "We've updated your todo fo you.",
        status: "success",
        duration: 500,
        isClosable: true,
      });
      method === "update" && setMethod("post");
    },
  });
  const id = todo?._id;

  const handleSubmitTodo = () => {
    method === "post"
      ? mutation.mutate({ task, time })
      : mutation.mutate({ id, task, time });
  };

  return (
    <Container
      as="main"
      height="100vh"
      overflowY={"hidden"}
      width="full"
      maxW={"5xl"}
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      justifyContent={{ md: "space-between" }}
      gap={{ base: "2rem", md: "2rem" }}
    >
      <Box as="header" mx="0 auto" mt={10}>
        <Heading
          as="h1"
          sx={{ textAlign: "center", fontWeight: 700, fontSize: "2.5rem" }}
          mb={4}
        >
          Make your day planned!
        </Heading>
        <Box mb={8}>
          <Text as="p" pb={2}>
            What is you task today?
          </Text>
          <Input type="text" onChange={onHandleChangeTask} value={task} />
        </Box>
        <Box mb={8}>
          <Text as="p" pb={2}>
            What time?
          </Text>
          <Input
            type="datetime-local"
            onChange={onHandleChangeTime}
            value={time}
          />
        </Box>{" "}
        <Button
          width="100%"
          bgColor="blue.500"
          _hover={{ bgColor: "blue.600" }}
          onClick={handleSubmitTodo}
        >
          {method === "post" ? "Submit" : "Update"}
        </Button>
      </Box>
      <Box width={{ base: "100%", md: "40%" }}>
        <TodoSection
          setTime={setTime}
          setTask={setTask}
          setMethod={setMethod}
          setTodo={setTodo}
        />
      </Box>
    </Container>
  );
};

export default TodoContainer;
