import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PgCard from '../components/PgCard';
import { getAllPgs } from '../../../services/pgService';

const AllPg = () => {
  const [pgs, setPgs] = useState([]);

  // FETCH ALL PGS

  const fetchPgs = async () => {
    try {
      const res = await getAllPgs();

      setPgs(res.pgs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPgs();
  }, []);

  return (
    <div className="px-6 py-10">
      {/* TOP */}

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">All PG's</h1>

        <Link
          to="/admin/addpg"
          className="rounded-xl bg-blue-600 px-5 py-3 text-white"
        >
          Add PG
        </Link>
      </div>

      {/* GRID */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {pgs.length > 0 ? (
          pgs.map((pg) => <PgCard key={pg._id} pg={pg} />)
        ) : (
          <div className="text-gray-500">No PG Found</div>
        )}
      </div>
    </div>
  );
};

export default AllPg;
