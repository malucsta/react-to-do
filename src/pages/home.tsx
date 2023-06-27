import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { formatDistance, format } from "date-fns";

import {
  AllActions,
  TarefaActionsEnum,
  TarefasState,
} from "../domain/reducers";

import { MyAppBar } from "../components/appBar";
import { AddItem } from "../components/addItem";
import { ListaTarefas } from "../components/tarefaLista";
import { Search } from "../components/search";
import { SetStateAction, useEffect, useState } from "react";
import { Tarefa } from "../domain/model/tarefa";
import React from "react";

interface Props {
  appState: TarefasState;
  dispatch: (action: AllActions) => void;
}

export function Home({ appState, dispatch }: Props) {
  const navigate = useNavigate();
  const [data, setData] = useState<Tarefa[]>([]);
  
  // const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const prevData = data;
  //   setData(prevData.concat(event.target.value));
  // };
  
  useEffect(() => {
    if(data.length > 0) {
      console.log("Data now is: ", data)
      console.log("Saving data as: ", data);
      localStorage.setItem('data', JSON.stringify(data));
      console.log("Tarefas: ", appState.tarefas.length);
      appState.tarefas = data;
    }
    else{
      console.log("Data is null or undefined");
    }
  }, [data]);

  useEffect(() => {
    //localStorage.setItem('data', '');
    const savedData = localStorage.getItem('data');
    if (savedData) {
      console.log("Saved data is: ", savedData);
      setData(JSON.parse(savedData));
      appState.tarefas = data;
    }
    console.log("Local storage is: ", localStorage.getItem('data'));
  }, []);

  const onTextChange = (name: string) => {
    dispatch({ type: TarefaActionsEnum.write, payload: { name } });
  };

  const onAdd = (task: string) => {
    const tarefa: Tarefa = {
      id: appState.tarefas.length.toString(),
      name: task,
      done: false,
      createdAt: new Date(),
    };
    console.log("Tarefa criada no on Add: ", tarefa)
    setData(data.concat(tarefa));
    dispatch({ type: TarefaActionsEnum.add, payload: {task} });
  };

  const goToTarefa = (id: string) => {
    navigate(`task/${id}`, { state: { id } });
  };

  const search = (search: string) => {
    dispatch({ type: "SEARCH", payload: { search } });
  };

  return (
    <>
      <MyAppBar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Inicio
        </Typography>

        <Search search={appState.search} onChangeText={search} />
      </MyAppBar>
      <main
        style={{
          padding: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <AddItem
          error={appState.error}
          name={appState.name}
          onTextChange={onTextChange}
          onAdd={onAdd}
        />
        <ListaTarefas
          search={appState.search}
          tarefas={appState.tarefas}
          dispatch={dispatch}
          goToTarefa={goToTarefa}
        />
      </main>
    </>
  );
}
