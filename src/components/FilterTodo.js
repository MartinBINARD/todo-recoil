import { useRecoilState } from 'recoil';
import { filterState } from '../recoil';

function FilterTodo() {
  const [filter, setFilterState] = useRecoilState(filterState);

  return (
    <select onChange={(e) => setFilterState(e.target.value)} value={filter}>
      <option value="all">Tout</option>
      <option value="done">Terminé</option>
      <option value="ongoing">En cours</option>
    </select>
  );
}

export default FilterTodo;
