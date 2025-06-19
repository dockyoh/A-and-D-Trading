let inputs = [];

export function setInputs(value, inputsId) {
  const matchingInputs = inputs.find((input) => input.id === inputsId);
  if (!matchingInputs) {
    inputs.push({
      id: inputsId,
      inputsValue: value,
    });
  } else {
    const matchingIndex = inputs.indexOf(matchingInputs);
    inputs[matchingIndex].inputsValue = value;
  }
  console.log(inputs);
}

export function getInputs(inputsId) {
  const matchingId = inputs.find((input) => input.id === inputsId);
  const matchingIndex = inputs.indexOf(matchingId);
  console.log(`matching index: ${matchingIndex}`);
  return inputs[matchingIndex].inputsValue;
}
