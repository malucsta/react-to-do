import { SetStateAction, useEffect, useRef, useState } from "react";
import { TextField, Button } from "@mui/material";
import { key } from "localforage";

interface Props {
  error: string;
  name: string;
  onAdd: (data: string) => void;
  onTextChange: (name: string) => void;
}

export const AddItem = ({ error, name, onTextChange, onAdd }: Props) => {
  const hasError = error.length > 0;
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "2%",
      }}
    >
      <TextField
        placeholder="Digite a tarefa"
        value={name}
        onChange={({ target }) => onTextChange(target.value)}
        error={hasError}
        label="Adicionar tarefa"
        helperText={error}
        ref={inputRef}
        fullWidth
      />
      <Button
        variant="contained"
        disabled={name.length === 0 || hasError}
        style={{ borderRadius: 5, marginLeft: "2%" }}
        onClick={() => {
          onAdd(name);
          inputRef.current?.focus();
        }}
      >
        Adicionar
      </Button>
    </div>
  );
};
