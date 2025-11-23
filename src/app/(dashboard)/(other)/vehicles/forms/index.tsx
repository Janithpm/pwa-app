"use client"

import { Fragment, useState } from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { Car, IdCard } from "lucide-react"

import { ratesFormValues, ratesSchema, VehicleFormValues, vehicleSchema } from "../zod"

type NewVehicleFormProps = {
  onClose?: () => void
}
type NewVehicleFormValues = VehicleFormValues & ratesFormValues

const steps = [
  { id: 1, title: "Vehicle Details", icon: Car },
  { id: 2, title: "Rates", icon: IdCard },
]

function NewVehicleForm({ onClose }: NewVehicleFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<NewVehicleFormValues>>({})
  const [isLoading, setIsLoading] = useState(false)

  const vehicleForm = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      make: formData.make || "",
      model: formData.model || "",
      category: formData.category || "",
      year: formData.year || new Date().getFullYear(),
      vin: formData.vin || "",
      licensePlate: formData.licensePlate || "",
      color: formData.color || "",
      mileage: formData.mileage || 0,
      transmission: formData.transmission || "automatic",
      seats: formData.seats || 1,
      fuelType: formData.fuelType || "gasoline",
      status: formData.status || "available",
    },
  })

  const ratesForm = useForm<ratesFormValues>({
    resolver: zodResolver(ratesSchema),
    defaultValues: {
      rates: formData.rates || [],
    },
  })

  const getCurrentForm = () => {
    switch (currentStep) {
      case 1:
        return vehicleForm
      case 2:
        return ratesForm
      default:
        return vehicleForm
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <div>Vehicle Details Form</div>
      case 2:
        return <div>Rates Form</div>
      default:
        return <div>Vehicle Details Form</div>
    }
  }

  const handleNext = async () => {
    const currentForm = getCurrentForm()
    const isValid = await currentForm.trigger()

    if (isValid) {
      const data = currentForm.getValues()
      setFormData(prev => ({ ...prev, ...data }))

      if (currentStep < steps.length) {
        setCurrentStep(prev => prev + 1)
      }
    }
  }

  const handleBack = () => {
    const currentData = getCurrentForm().getValues()
    setFormData(prev => ({ ...prev, ...currentData }))

    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSave = async () => {
    const currentForm = getCurrentForm()
    const isValid = await currentForm.trigger()
    if (isValid) {
      const data = currentForm.getValues()
      console.log("form data: ", data)
    } else {
      console.log("form is invalid")
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 px-8 py-6 pb-4 border-b">
        <div className="flex items-center justify-center w-full">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id

            return (
              <Fragment key={step.id}>
                <div className="flex items-start justify-center gap-2 last:mr-12">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : isCompleted
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-muted-foreground bg-background"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div
                      className={`text-sm font-medium ${
                        isActive
                          ? "text-primary"
                          : isCompleted
                            ? "text-green-600"
                            : "text-muted-foreground"
                      }`}
                    >
                      Step {step.id}
                    </div>
                    <div
                      className={`text-xs ${
                        isActive
                          ? "text-primary"
                          : isCompleted
                            ? "text-green-600"
                            : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${isCompleted ? "bg-green-500" : "bg-muted"}`}
                  />
                )}
              </Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default NewVehicleForm
