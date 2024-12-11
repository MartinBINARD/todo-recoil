import { selectTodosData } from '../recoil';
import { useRecoilValue } from 'recoil';

function TodoData() {
  const { total, totalDone, totalOngoing, totalDonePourcentage } =
    useRecoilValue(selectTodosData);

  return (
    <div className="card p-20">
      <ul>
        <li>Nombre de todos : {total}</li>
        <li>Nombre de todos terminées : {totalDone} </li>
        <li>Nombre de todos en cours : {totalOngoing} </li>
        <li>Pourcentage de todos terminées : {totalDonePourcentage} %</li>
      </ul>
    </div>
  );
}

export default TodoData;
