import React from 'react'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'

const newCircleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 60 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCircleFormValidationSchema>

export const NewCycleForm = () => {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCircleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        id="minutesAmount"
        type="number"
        placeholder="00"
        disabled={!!activeCycle}
        step={5}
        min={1}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
function zodResolver(
  newCircleFormValidationSchema: zod.ZodObject<
    { task: zod.ZodString; minutesAmount: zod.ZodNumber },
    'strip',
    zod.ZodTypeAny,
    { task: string; minutesAmount: number },
    { task: string; minutesAmount: number }
  >,
):
  | import('react-hook-form').Resolver<
      { task: string; minutesAmount: number },
      any
    >
  | undefined {
  throw new Error('Function not implemented.')
}
