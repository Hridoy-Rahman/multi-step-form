
export default function Summary({ formData, prevStep, handleSubmit }: any) {
    const { ...displayData } = formData;
  
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Summary</h2>
        <ul className="text-sm space-y-1">
          {Object.entries(displayData).map(([key, value]) => (
            <li key={key}><strong>{key}:</strong> {String(value)}</li>
          ))}
        </ul>
        <div className="flex justify-between">
          <button className="btn-secondary" onClick={prevStep}>Previous</button>
          <button className="btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }