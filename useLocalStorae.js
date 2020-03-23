const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');
  console.log(storage);
  if (storage) return JSON.parse(storage).count;
  return { count: 0 };
};

const storeStateInLocalStorage = count => {
  localStorage.setItem('counterState', JSON.stringify({ count }));
  console.log(localStorage);
};

const useLocalStorage = (initialState, key) => {
  const get = () => {
    const storage = localStorage.getItem(key);
    console.log(localStorage, storage);
    if (storage) return JSON.parse(storage).value;
    return initialState;
  };

  const [value, setValue] = useState(get());

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ value }));
  }, [value]);

  return [value, setValue];
};

//example use 
/*
const Counter = ({ max, step }) => {
  const [count, setCount] = useLocalStorage(0, 'count');
  
  const decrement = () => setCount(count - 1);
});
*/