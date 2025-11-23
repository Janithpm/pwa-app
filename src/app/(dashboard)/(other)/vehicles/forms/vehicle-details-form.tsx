import { UseFormReturn } from "react-hook-form"

import { Form } from "@/components/ui/form"

import { VehicleFormValues } from "../zod"

type VehicleDetailsFormProps = {
  form: UseFormReturn<VehicleFormValues>
}

function VehicleDetailsForm({ form }: VehicleDetailsFormProps) {
  return <Form {...form}>VehicleDetailsForm</Form>
}

export default VehicleDetailsForm
