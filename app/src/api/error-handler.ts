export default async function errorHandle<T>(promise: Promise<T>): Promise<T> {
  try {
    const result = await promise;
    return result;
  } catch (error) {
    console.warn("API error: ", error);
    alert("Error: " + error);
    return null as unknown as T; // TODO: add actual error handling
  }
}
