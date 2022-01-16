import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export type Inputs = {
  description: string;
  done: boolean;
};

interface Props {
  onSubmit: SubmitHandler<Inputs>;
  defaultValues: Inputs;
  header: string;
}

export const BaseTodoForm = ({ header, onSubmit, defaultValues }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <header>
        <h2>{header}</h2>
      </header>

      <label htmlFor="description">
        Description
        <input {...register("description", { required: true })} type="text" />
      </label>

      <div style={{ color: "red" }}>
        {errors?.description && "Description is required"}
      </div>

      <label htmlFor="done">
        Done:
        <input {...register("done", {})} type="checkbox" />
      </label>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
