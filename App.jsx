import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Home, Sprout, MapPin, Leaf, Calendar, CheckCircle, Bell, AlertTriangle, CalendarDays,
  Droplets, SprayCan, Carrot, AlertCircle, Users, LineChart, Map
} from 'lucide-react';
import {
  LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// Datos simulados para las ubicaciones
const simulatedGreenhouses = [
  {
    id: 'puebla-001',
    name: 'Invernadero Sol Naciente',
    location: 'Puebla, Puebla',
    coordinates: { lat: 19.0414, lon: -98.2063 },
    cropType: 'Tomate',
    seedVariety: 'Tomate Saladette SVTE8444',
    sowingDate: '2024-03-15',
    dailyLogs: [
      { date: '2025-05-24', tempMax: 28 },
      { date: '2025-05-25', tempMax: 29 },
      { date: '2025-05-26', tempMax: 30 },
      { date: '2025-05-27', tempMax: 31 }
    ],
    irrigationLogs: [
      { date: '2025-05-24', water: 450 },
      { date: '2025-05-25', water: 480 },
      { date: '2025-05-26', water: 500 },
      { date: '2025-05-27', water: 520 }
    ],
    applicationLogs: [ { date: '2025-05-25', product: 'Fertilizante NPK' } ],
    harvestLogs: [ { date: '2025-05-20', weight: 150 } ],
    incidents: [ { description: 'Mosca blanca detectada' } ],
    personnel: [ { name: 'Juan Pérez', task: 'Poda' } ]
  }
];

const App = () => {
  const [selectedGreenhouseId, setSelectedGreenhouseId] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const greenhouse = simulatedGreenhouses.find(g => g.id === selectedGreenhouseId);

  const TabButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={\`flex items-center px-4 py-2 rounded-lg border \${activeTab === id ? 'bg-green-500 text-white' : 'bg-white text-gray-700'} shadow\`}
    >
      <Icon className="mr-2" size={18} /> {label}
    </button>
  );

  if (!greenhouse || activeTab === 'dashboard') {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <Home className="mr-3 text-green-600" size={32} /> Dashboard del Asesor
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {simulatedGreenhouses.map((gh) => (
            <div
              key={gh.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-green-200"
              onClick={() => {
                setSelectedGreenhouseId(gh.id);
                setActiveTab('general');
              }}
            >
              <div className="flex items-center mb-4">
                <Sprout className="text-green-500 mr-3" size={28} />
                <h2 className="text-xl font-semibold text-gray-700">{gh.name}</h2>
              </div>
              <p className="text-gray-600 flex items-center mb-2">
                <MapPin className="mr-2 text-gray-400" size={18} /> {gh.location}
              </p>
              <p className="text-gray-600 flex items-center mb-2">
                <Leaf className="mr-2 text-gray-400" size={18} /> Cultivo: {gh.cropType} - {gh.seedVariety}
              </p>
              <p className="text-gray-600 flex items-center mb-4">
                <Calendar className="mr-2 text-gray-400" size={18} /> Siembra: {gh.sowingDate}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span className="flex items-center">
                  <CheckCircle className="text-green-500 mr-1" size={16} /> Último registro: {gh.dailyLogs.at(-1)?.date || 'N/A'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const tabComponents = {
    general: (
      <section className="space-y-4">
        <div className="text-gray-700">
          <p><strong>Ubicación:</strong> {greenhouse.location}</p>
          <p><strong>Coordenadas:</strong> {greenhouse.coordinates.lat}, {greenhouse.coordinates.lon}</p>
          <p><strong>Cultivo:</strong> {greenhouse.cropType}</p>
        </div>
      </section>
    ),
    clima: (
      <section>
        <div className="text-sm text-gray-700">Clima exterior simulado: Soleado, 28°C, humedad 55%</div>
      </section>
    ),
    registro: (
      <ResponsiveContainer width="100%" height={300}>
        <ReLineChart data={greenhouse.dailyLogs}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="tempMax" stroke="#22c55e" name="Temp. Máxima" />
        </ReLineChart>
      </ResponsiveContainer>
    ),
    riego: (
      <ResponsiveContainer width="100%" height={300}>
        <ReLineChart data={greenhouse.irrigationLogs}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="water" stroke="#3b82f6" name="Agua (L)" />
        </ReLineChart>
      </ResponsiveContainer>
    ),
    aplicaciones: (
      <ul className="text-gray-600 list-disc list-inside">
        {greenhouse.applicationLogs.map((log, i) => (
          <li key={i}>Fecha: {log.date} - Producto: {log.product}</li>
        ))}
      </ul>
    ),
    cosecha: (
      <ul className="text-gray-600 list-disc list-inside">
        {greenhouse.harvestLogs.map((log, i) => (
          <li key={i}>Fecha: {log.date} - Peso: {log.weight} kg</li>
        ))}
      </ul>
    ),
    incidencias: (
      <ul className="text-gray-600 list-disc list-inside">
        {greenhouse.incidents.map((inc, i) => (
          <li key={i}>{inc.description}</li>
        ))}
      </ul>
    ),
    personal: (
      <ul className="text-gray-600 list-disc list-inside">
        {greenhouse.personnel.map((p, i) => (
          <li key={i}>{p.name} - {p.task}</li>
        ))}
      </ul>
    ),
    mapa: (
      <div className="w-full h-64 bg-green-100 flex items-center justify-center text-gray-700">
        <Map className="mr-2" /> Mapa Simulado ({greenhouse.coordinates.lat}, {greenhouse.coordinates.lon})
      </div>
    )
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <button onClick={() => setActiveTab('dashboard')} className="text-blue-600 underline mb-4">Volver al Dashboard</button>
      <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
        <CalendarDays className="mr-2 text-green-600" size={28} /> {greenhouse.name}
      </h2>
      <div className="flex flex-wrap gap-2 mb-6">
        <TabButton id="general" icon={Home} label="General" />
        <TabButton id="clima" icon={Calendar} label="Clima" />
        <TabButton id="registro" icon={LineChart} label="Registro" />
        <TabButton id="riego" icon={Droplets} label="Riego" />
        <TabButton id="aplicaciones" icon={SprayCan} label="Aplicaciones" />
        <TabButton id="cosecha" icon={Carrot} label="Cosecha" />
        <TabButton id="incidencias" icon={AlertCircle} label="Incidencias" />
        <TabButton id="personal" icon={Users} label="Personal" />
        <TabButton id="mapa" icon={Map} label="Mapa" />
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        {tabComponents[activeTab]}
      </div>
    </div>
  );
};

export default App;
