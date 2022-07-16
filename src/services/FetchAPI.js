const fetchAPIs = async (url) => {
  const reponse = await fetch(url);
  const data = await reponse.json();
  return data;
};

export default fetchAPIs;
