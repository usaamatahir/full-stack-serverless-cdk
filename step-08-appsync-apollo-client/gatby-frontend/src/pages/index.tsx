import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { nanoid } from "nanoid";

const GET_TODOS = gql`
  query {
    getTodos {
      id
      task
      done
    }
  }
`;
const CREATE_TODO = gql`
  mutation createTodo($todo: TodoInput!) {
    addTodo(todo: $todo) {
      id
      task
      done
    }
  }
`;

const Home = () => {
  const [task, setTask] = useState("");
  const { data, loading } = useQuery(GET_TODOS);
  const [createNote] = useMutation(CREATE_TODO);

  const handleSubmit = async () => {
    const todo = {
      id: nanoid(6),
      task,
      done: false,
    };
    console.log("Creating Todo:", todo);
    setTask("");
    await createNote({
      variables: {
        todo,
      },
    });
  };

  return (
    <div>
      {loading && <h1>Loading ...</h1>}
      <label>
        Todo:
        <input value={task} onChange={({ target }) => setTask(target.value)} />
      </label>
      <button onClick={() => handleSubmit()}>Create Todo</button>
      {!loading &&
        data &&
        data.getTodos.map((item: any) => (
          <div style={{ marginLeft: "1rem", marginTop: "2rem" }} key={item.id}>
            {item.task} {item.done ? "DONE" : "NOT COMPLETED"}
          </div>
        ))}
    </div>
  );
};

export default Home;
