const initialState = {
  result: null,
  loading: true,
  error: null
};

const fetchReducer = (state, action) => {
  if (action.type === 'LOADING') {
    return {
      result: null,
      loading: action.payload.status,
      error: null
    };
  }

  if (action.type === 'RESPONSE_COMPLETE') {
    return {
      result: action.payload.response,
      loading: false,
      error: false
    };
  }

  if (action.type === 'ERROR') {
    return {
      result: null,
      loading: false,
      error: action.payload.error
    };
  }

  return state;
};

const useAjax = endpoint => {
  const [state, dispatch] = React.useReducer(fetchReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'LOADING', payload: { status: true } });
    const fetchUrl = async url => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        dispatch({ type: 'RESPONSE_COMPLETE', payload: { response: data } });
      } catch {
        dispatch({ type: 'ERROR', payload: { error } });
      }
    };

    fetchUrl(endpoint);
  }, [endpoint, loading]);

  const reload = () => {
    dispatch({ type: 'LOADING', payload: { status: true } });
  };

  return [state.response, state.loading, state.error, reload];
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
