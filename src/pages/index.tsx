import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import firebase from 'firebase/app';
import 'firebase/database';
import { db } from '@/services/firebase';

interface Guest {
  name: string;
  isConfirmed: boolean;
  email: string;
  phone: string;
  total_adults: number;
}

export default function Home() {
  const [tableData, setTableData] = useState<Guest[]>([]);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  const handleOnFilterChange = () => {
    setIsFiltering(!isFiltering);
    console.log('filtro', isFiltering);

  }

  useEffect(() => {
    const fetchData = async () => {
      const q = isFiltering ? query(collection(db, 'guests'), where("isConfirmed", "==", "Sim")) : query(collection(db, 'guests'))
      const guestsCollection = await getDocs(q)
      const guestsData = guestsCollection.docs.map(doc => {
        return {
          name: doc.data().name,
          isConfirmed: doc.data().isConfirmed,
          email: doc.data().email,
          phone: doc.data().phone,
          total_adults: doc.data().total_adults
        }
      });
      console.log('GUESTS:::', guestsData[0]);

      setTableData(guestsData);
    }
    fetchData();
  }, [isFiltering]);

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className='w-full flex'>
          <label htmlFor="confirmedSwitch" className="text-gray-600">
            <p className="text-sm">
              Filtrar apenas confirmados
            </p>
          </label>
          <div className="relative inline-block w-10 align-middle select-none">
            <input
              type="checkbox"
              id="confirmedSwitch"
              className="form-checkbox h-4 w-4 text-indigo-600"
              checked={isFiltering}
              onChange={handleOnFilterChange}
            />
          </div>
        </div>
        <div>
          <p className="text-xs font-bold">
            Total de pessoas: {tableData.length}
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <p className='text-xl'>
                    Nome
                  </p>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <p className='text-xl'>
                    Confirmado
                  </p>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <p className='text-xl'>
                    Email
                  </p>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <p className='text-xl'>
                    Telefone
                  </p>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <p className='text-xl'>
                    Total de adultos
                  </p>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((rowData, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className='text-sm'>
                      {rowData.name}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className='text-sm'>
                      {rowData.isConfirmed}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className='text-sm'>
                      {rowData.email}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className='text-sm'>
                      {rowData.phone}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className='text-sm'>
                      {rowData.total_adults}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
