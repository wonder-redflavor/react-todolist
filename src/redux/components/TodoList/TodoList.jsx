import React, { useEffect } from "react";
import { StyledDiv, StyledTodoListHeader, StyledTodoListBox } from "./styles";
import Todo from "../Todo";
import { getTodos } from "../../../api/todos";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { __getTodos } from "../../modules/todosSlice";

/**
 * 컴포넌트 개요 : 메인 > TODOLIST. 할 일의 목록을 가지고 있는 컴포넌트
 * 2022.12.16 : 최초 작성
 *
 * @returns TodoList 컴포넌트
 */
function TodoList({ isActive }) {
  // const { isLoading, isError, data } = useQuery("todos", getTodos);

  const { todos, isLoading, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  if (isLoading) {
    return <p>로딩중입니다....!</p>;
  }

  if (error) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  return (
    <StyledDiv>
      <StyledTodoListHeader>
        {isActive ? "해야 할 일 ⛱" : "완료한 일 ✅"}
      </StyledTodoListHeader>
      <StyledTodoListBox>
        {todos
          .filter((item) => item.isDone === !isActive)
          .map((item) => {
            return <Todo key={item.id} todo={item} isActive={isActive} />;
          })}
      </StyledTodoListBox>
    </StyledDiv>
  );
}

export default TodoList;
