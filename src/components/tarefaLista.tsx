import { Typography } from "@mui/material";
import { TarefaItem } from "./tarefaItem";

import { AllActions } from "../domain/reducers";
import { Tarefa, makeSearchByName } from "../domain/model/tarefa";
import React from "react";

interface Props {
  tarefas: Tarefa[];
  search: string;
  dispatch: (tarefas: AllActions) => void;
  goToTarefa: (id: string) => void;
}

export const ListaTarefas = ({
  search,
  tarefas,
  dispatch,
  goToTarefa,
}: Props) => {
  const doSearch = makeSearchByName(search);

  const deleteTask = (id: string) => {
    dispatch({ type: "REMOVE", payload: { id } });
  };

  const toggleDone = (id: string) => {
    const data = JSON.parse(localStorage.getItem('data')!);
    
    const updatedData = data.map(item => {
      if (item.id === id) {
        return {
          ...item,
          done: !item.done // Toggle the done field
        };
      }
      return item;
    });

    localStorage.setItem('data', JSON.stringify(updatedData));
    dispatch({ type: "TOGGLE", payload: { id } });
  };

  const hasTasks = tarefas.length > 0;

  return (
    <div style={{
      marginTop: "4%",
      display: "flex",
      width: "100%",
      flexDirection: "column",
    }}>
      {!hasTasks && (
        <Typography
          variant="body1"
          style={{ textAlign: "center" }}
        >
          Sem tarefas criadas 😶
        </Typography>
      )}
      {tarefas
        .filter((tarefa) => doSearch(tarefa))
        .map((tarefa) => (
          <TarefaItem
            tarefa={tarefa}
            key={tarefa.id}
            onDelete={deleteTask}
            toggleDone={toggleDone}
            goToTarefa={goToTarefa}
          />
        ))}
    </div>
  );
};
