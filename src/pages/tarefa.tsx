import { formatDistance, format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { TarefasState } from "../domain/reducers";
import { IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MyAppBar } from "../components/appBar";
import { useNavigate, useParams } from "react-router-dom";
import { TarefaNotFound } from "../components/tarefaNotFound";
import React from "react";

interface Props {
  appState: TarefasState;
}

export const TarefaPage = ({ appState }: Props) => {
  const params = useParams();
  const { id: taskId } = params;

  const tarefa = appState.tarefas.find((tarefa) => tarefa.id === taskId);

  const navigate = useNavigate();

  if (!tarefa) {
    return <TarefaNotFound navigate={navigate} />;
  }

  return (
    <>
      {console.log("Tarefa: ", tarefa)}
      {console.log("Tarefa date: ", tarefa.createdAt)}
      
      <MyAppBar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => {
            navigate("/");
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {`Tarefa ${tarefa.name}`}
        </Typography>
      </MyAppBar>
      <main
        style={{
          padding: "2%",
          justifyContent: "space-around",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          flex: 1,
        }}
      >
        <Typography variant="h1">{tarefa.name}</Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "80vw",
            marginTop: "2%",
          }}
        >
          <img
            src="https://picsum.photos/id/13/2500/1667?blur=2"
            height={300}
            width={300}
            style={{
              borderRadius: 10,
            }}
          />

          <section>
            <Typography variant="body1">
              Feita? {tarefa.done ? "👍" : "Nop 👎"}
            </Typography>
            <Typography variant="body1">
              Data de Criação:
              {tarefa.createdAt.toString()}
              {/* {format(tarefa.createdAt, " eeee, dd/MM/yyyy HH:mm", {
                locale: ptBR,
              })} */}
            </Typography>
            <Typography variant="body1">
              {/* {formatDistance(tarefa.createdAt, new Date(), {
                addSuffix: true,
                locale: ptBR,
              })} */}
            </Typography>
          </section>
        </div>
      </main>
    </>
  );
};
