import {
  Box,
  Card,
  CardHeader,
  Heading,
  CardBody,
  HStack,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import HTTPRequest from "../services/HTTPRequest";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const TodoSection = ({ setTime, setTask, setMethod, setTodo }) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const http = new HTTPRequest();
  const { data, isLoading } = useQuery(["todos"], () => http.getAll(), {
    refetchOnWindowFocus: true,
  });

  const mutation = useMutation({
    mutationFn: (newTodo) => {
      http.deleteTodo(newTodo);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      toast({
        title: "Todo deleted successfully",
        description: "We've deleted your todo fo you.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    },
  });

  const updateTodoHandler = (todo) => {
    setTodo(todo);
    const dateObject = new Date(todo.time);
    const formattedDateTime = dateObject.toISOString().slice(0, 16);
    setTask(todo.task);
    setTime(formattedDateTime);
    setMethod("update");
  };

  const deleteTodoHandler = (todo) => {
    mutation.mutate(todo._id);
  };

  return (
    <Box mt={10} height="100%" overflowY="auto">
      <Heading as="h2" fontSize="2xl">
        Tasks
      </Heading>
      {!isLoading &&
        data?.map((todo, i) => (
          <Card key={todo + i} maxWidth="100%" my={4}>
            <CardHeader>
              <Heading size="md">{todo.task}</Heading>
            </CardHeader>
            <CardBody>
              <Text> {todo.time} </Text>
              <HStack spacing={4} mt={4}>
                <Button
                  size="sm"
                  bgColor="green.500"
                  onClick={() => updateTodoHandler(todo)}
                >
                  Update
                </Button>
                <Button size="sm" onClick={() => deleteTodoHandler(todo)}>
                  Delete
                </Button>
              </HStack>
            </CardBody>
          </Card>
        ))}
    </Box>
  );
};

export default TodoSection;
