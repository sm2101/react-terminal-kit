const storeHistory = (history: string[]) => {
  //write to session storage
  const existingHistory = sessionStorage.getItem("history");
  if (existingHistory) {
    localStorage.removeItem("history");
  }
  //store only last 50 commands
  sessionStorage.setItem("history", JSON.stringify(history.slice(-50)));
};

const getHistory = () => {
  const existingHistory = sessionStorage.getItem("history");
  if (existingHistory) {
    return JSON.parse(existingHistory);
  }
  return [];
};

const clearHistory = () => {
  sessionStorage.removeItem("history");
};

export { storeHistory, getHistory, clearHistory };
