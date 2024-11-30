import { RecipeDetailType } from "../../../Dashboard/DetailRecipeContent/lib/type";

interface RecipeStepsProps {
  data: RecipeDetailType;
}

export default function RecipeSteps({ data }: RecipeStepsProps) {
  return (
    <div className="mt-8 px-2.5 lg:px-4">
      <h2 className="text-3xl md:text-2xl lg:text-4xl font-semibold text-gray-800 mb-6">Method</h2>
      <div className="space-y-6 w-full md:w-[85%] lg:w-[70%]">
        {data.steps
          .sort((a, b) => Number(a.step_number) - Number(b.step_number))
          .map((step, index) => (
            <div key={step._id}>
              <div className="flex items-start gap-y-1.5 space-x-4">
                <div className="lg:text-lg text-base font-semibold text-gray-800">
                  Step {step.step_number}
                </div>
              </div>
              <p className="mt-2 text-gray-600 w-[90%] lg:text-base text-sm">{step.instruction}</p>
              {index < data.steps.length - 1 && (
                <div className="border-b border-gray-300 mt-4 border-[0.1rem]"></div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
