const useAjax = (endpoint, defaultValue = {}) => {
  const [results, setResults] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(endpoint)
      .then(response => response.json())
      .then(response => {
        setResults(response);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [endpoint, loading]);

  const reload = () => {
    setLoading(true);
    setError(false);
  };

  return [results, loading, error, reload];
};


/**
 * Usage 
	const [results, loading, error, reload] = useAjax(ENDPOINT, { results: [] });

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error!</p>;
  
    return (
    <div>
      <button onClick={reload}>Reload</button>
		...
    </div>
  );
 */