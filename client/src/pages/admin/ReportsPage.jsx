import { useState, useEffect } from "react";
import api from "../../api/api";

const ReportsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const fetchReport = async () => {
    try {
      setLoading(true);
      const params = {};
      if (start) params.start = start;
      if (end) params.end = end;
      const res = await api.get("/api/v1/admin/reports/financial", { params });
      setReport(res.data);
    } catch (err) {
      console.error(err);

      setError("Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const formatCurrency = (value) => "Rp " + Number(value).toLocaleString();

  if (loading) return <div>Loading report...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <div>
        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Financial Report</h1>
        </div>

        {/* FILTER */}
        <div className="bg-white rounded shadow p-4 mb-4 flex gap-4 items-end">
          <div>
            <label className="text-sm">Start Date</label>

            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="border p-2 block"
            />
          </div>

          <div>
            <label className="text-sm">End Date</label>

            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="border p-2 block"
            />
          </div>

          <button
            onClick={fetchReport}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Apply
          </button>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-3 gap-4">
          <Card
            title="Rent Income"
            value={formatCurrency(report.summary.rentTotal)}
          />
          <Card
            title="Deposit Received"
            value={formatCurrency(report.summary.depositTotal)}
          />
          <Card
            title="Deposit Returned"
            value={formatCurrency(report.summary.depositReturnTotal)}
          />
          <Card
            title="Damage Deduction"
            value={formatCurrency(report.summary.damageDeductionTotal)}
          />
          <Card
            title="Net Cash In"
            value={formatCurrency(report.summary.netcashIn)}
          />
          <Card title="Overdue Tenants" value={report.summary.overdueTenants} />
        </div>
      </div>
    </>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white p-6 rounded shadow">
    <div className="text-gray-400">{title}</div>
    <div className="text-2xl font-bold mt-2">{value}</div>
  </div>
);

export default ReportsPage;
