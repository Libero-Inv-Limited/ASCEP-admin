import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ResponseChart() {
  const data = [
    {
      name: "January",
      approved: 3500000,
      invalid: 1400000,
      comments: 200000,
    },
    {
      name: "February",
      approved: 4200000,
      invalid: 3800000,
      comments: 4300000,
    },
    {
      name: "March",
      approved: 6000000,
      invalid: 3800000,
      comments: 5100000,
    },
    {
      name: "April",
      approved: 2500000,
      invalid: 4200000,
      comments: 6400000,
    },
    {
      name: "May",
      approved: 7800000,
      invalid: 8900000,
      comments: 8100000,
    },
    {
      name: "June",
      approved: 9500000,
      invalid: 6700000,
      comments: 7600000,
    },
    {
      name: "July",
      approved: 8200000,
      invalid: 5300000,
      comments: 6700000,
    },
    {
      name: "August",
      approved: 8800000,
      invalid: 4400000,
      comments: 9200000,
    },
    {
      name: "September",
      approved: 7700000,
      invalid: 6200000,
      comments: 8900000,
    },
    {
      name: "October",
      approved: 6900000,
      invalid: 9500000,
      comments: 7800000,
    },
    {
      name: "November",
      approved: 7200000,
      invalid: 7800000,
      comments: 9800000,
    },
    {
      name: "December",
      approved: 8500000,
      invalid: 9200000,
      comments: 8500000,
    },
  ];

  return (
    <div className="bg-white w-full py-5 px-7 space-y-8 rounded-[30px]">
      <div className="flex items-center gap-6">
        <h3 className="mr-8 text-lg text-dark">Response</h3>

        {categories.map((category) => (
          <div key={category.title} className="flex items-center gap-4 ">
            <div
              className={`rounded-full w-[6px] h-[6px] `}
              style={{ backgroundColor: category.color }}
            />
            <div className="text-xs font-medium text-subtitle">
              {category.title}
            </div>
            <div className="text-sm font-semibold text-dark">
              {category.total}
            </div>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          // height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis opacity={0.6} className="mr-10" dataKey="name" />
          <YAxis
            opacity={0.6}
            tickFormatter={(value) => `${value / 1000000}M`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="approved"
            stroke="#18A201"
            strokeWidth={3.5}
            strokeOpacity={0.4}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="invalid"
            stroke="#ED4A4A"
            strokeWidth={3.5}
            strokeOpacity={0.4}
          />
          <Line
            type="monotone"
            dataKey="comments"
            stroke="#354D99"
            strokeWidth={3.5}
            strokeOpacity={0.4}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload) {
    // Customize the tooltip content here
    return (
      <div className="bg-white rounded-[32px] py-6 ">
        <p className="pbf-2 text-[#034483] px-5 font-bold">
          {payload[0].payload.name}
        </p>
        <div className="space-y-2">
          {payload.map((payloadItem: any, i: number) => (
            <div
              key={i}
              className="flex items-center text-[#032282]  gap-2 bg-[#F6F8FFE5] px-[18px]"
            >
              <div
                className={`rounded-full w-[6px] h-[6px]  `}
                style={{ backgroundColor: payloadItem.stroke }}
              />
              <p className="capitalize ">
                {`${payloadItem.name} :`}{" "}
                <span className="font-bold">${payloadItem.value}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

const categories = [
  {
    title: "Approved Reports",
    total: "112,190,000",
    color: "#18A201",
  },
  {
    title: "Invalid Reports",
    total: "112,190,000",
    color: "#ED4A4A",
  },
  {
    title: "Comments (/10k)",
    total: "112,190,000",
    color: "#354D99",
  },
];
