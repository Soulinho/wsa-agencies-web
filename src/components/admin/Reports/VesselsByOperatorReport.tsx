import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';
import NavFooter from '../NavFooter';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { jsPDF } from 'jspdf';
import logoImage from '../../../assets/logo.png';

const VesselsByOperatorReport = () => {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState('2025-01-01');
  const [toDate, setToDate] = useState('2025-12-31');
  const [selectedOperators, setSelectedOperators] = useState<string[]>([]);

  const allOperators = ['ALL', 'Juan Riquelme', 'Maria Gonzalez', 'Carlos Ruiz', 'Ana Lopez', 'Pedro Martinez'];

 
  const vessels = [
    {
      daId: '202323',
      vesselName: 'Ocean Star',
      port: 'Valparaíso',
      country: 'Chile',
      eta: '24-04-2025',
      etb: '',
      etd: '26-04-2025',
      notes: true,
      client: "Marco's Company",
      operator: 'Juan Riquelme',
      status: 'Completed'
    }
  ];

  const filteredVessels = useMemo(() => {
    if (selectedOperators.length === 0 || selectedOperators.includes('ALL')) {
      return vessels;
    }
    return vessels.filter(vessel => selectedOperators.includes(vessel.operator));
  }, [selectedOperators]);

  const totalVessels = filteredVessels.length;

  const handleOperatorChange = (operator: string) => {
    if (operator === 'ALL') {
      setSelectedOperators(prev => 
        prev.includes('ALL') ? [] : ['ALL']
      );
    } else {
      setSelectedOperators(prev => {
        const filtered = prev.filter(o => o !== 'ALL');
        return filtered.includes(operator) 
          ? filtered.filter(o => o !== operator)
          : [...filtered, operator];
      });
    }
  };

  const generatePDF = () => {
    try {
      console.log('Generando PDF...');
      
      const doc = new jsPDF();
      
      const generatePDFWithLogo = () => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = function() {
          try {
            const imgWidth = 50;
            const imgHeight = 15;
            const pageWidth = doc.internal.pageSize.getWidth();
            const x = (pageWidth - imgWidth) / 2;
            
            doc.addImage(img, 'PNG', x, 10, imgWidth, imgHeight);
            
            doc.setFontSize(16);
            const title = 'TOTAL VESSEL\'S BY OPERATOR';
            const titleWidth = doc.getTextWidth(title);
            const titleX = (pageWidth - titleWidth) / 2;
            doc.text(title, titleX, 40);
            
            doc.setFontSize(10);
            doc.text('FROM:', 20, 55);
            doc.text(`${fromDate.split('-').reverse().join('/')}`, 60, 55);
            doc.text('TO:', 120, 55);
            doc.text(`${toDate.split('-').reverse().join('/')}`, 140, 55);
            
            doc.text('TOTAL VESSELS:', 20, 70);
            doc.text(`${totalVessels}`, 80, 70);
            doc.text('OPERATOR:', 120, 70);
            
            const operatorText = selectedOperators.length > 0 ? selectedOperators.join(', ') : 'TODOS';
            const maxWidth = 60;
            
            if (doc.getTextWidth(operatorText) > maxWidth) {
              const words = operatorText.split(', ');
              let currentLine = '';
              let yPos = 70;
              
              for (let i = 0; i < words.length; i++) {
                const testLine = currentLine + (currentLine ? ', ' : '') + words[i];
                if (doc.getTextWidth(testLine) > maxWidth && currentLine) {
                  doc.text(currentLine, 150, yPos);
                  currentLine = words[i];
                  yPos += 10;
                } else {
                  currentLine = testLine;
                }
              }
              
              if (currentLine) {
                doc.text(currentLine, 150, yPos);
              }
              
              doc.setFontSize(12);
              doc.text('DETAILS:', 20, Math.max(85, yPos + 15));
              
              const detailsY = Math.max(95, yPos + 25);
              
              if (filteredVessels.length > 0) {
                let yPosition = detailsY;
                
                const tableStartY = yPosition;
                const rowHeight = 8;
                const colWidths = [25, 30, 25, 20, 15, 15, 25, 30];
                const colPositions = [15];
                
                for (let i = 0; i < colWidths.length - 1; i++) {
                  colPositions.push(colPositions[i] + colWidths[i]);
                }
                
                doc.setFontSize(8);
                const headers = ['DA ID', 'VESSEL', 'PORT', 'COUNTRY', 'ETA', 'ETD', 'CUSTOMER', 'OPERATOR'];
                
                doc.rect(15, yPosition, 185, rowHeight);
                
                headers.forEach((header, index) => {
                  doc.text(header, colPositions[index] + 1, yPosition + 6);
                });
                
                yPosition += rowHeight;
                
                for (let i = 0; i <= colPositions.length; i++) {
                  const x = i === colPositions.length ? 200 : colPositions[i];
                  doc.line(x, tableStartY, x, yPosition);
                }
                
                filteredVessels.forEach((vessel) => {
                  const rowData = [
                    vessel.daId,
                    vessel.vesselName,
                    vessel.port,
                    vessel.country,
                    vessel.eta.split('-').reverse().join('/'),
                    vessel.etd.split('-').reverse().join('/'),
                    vessel.client,
                    vessel.operator
                  ];
                  
                  doc.rect(15, yPosition, 185, rowHeight);
                  
                  doc.setFontSize(7);
                  rowData.forEach((data, colIndex) => {
                    doc.text(data, colPositions[colIndex] + 1, yPosition + 6);
                  });
                  
                  yPosition += rowHeight;
                  
                  for (let i = 0; i <= colPositions.length; i++) {
                    const x = i === colPositions.length ? 200 : colPositions[i];
                    doc.line(x, yPosition - rowHeight, x, yPosition);
                  }
                  
                  if (yPosition > 250) {
                    doc.addPage();
                    yPosition = 20;
                  }
                });
              }
            } else {
              doc.text(operatorText, 150, 70);
              
              doc.setFontSize(12);
              doc.text('DETAILS:', 20, 85);
              
              if (filteredVessels.length > 0) {
                let yPosition = 95;
                
                const tableStartY = yPosition;
                const rowHeight = 8;
                const colWidths = [25, 30, 25, 20, 15, 15, 25, 30];
                const colPositions = [15];
                
                for (let i = 0; i < colWidths.length - 1; i++) {
                  colPositions.push(colPositions[i] + colWidths[i]);
                }
                
                doc.setFontSize(8);
                const headers = ['DA ID', 'VESSEL', 'PORT', 'COUNTRY', 'ETA', 'ETD', 'CUSTOMER', 'OPERATOR'];
                
                doc.rect(15, yPosition, 185, rowHeight);
                
                headers.forEach((header, index) => {
                  doc.text(header, colPositions[index] + 1, yPosition + 6);
                });
                
                yPosition += rowHeight;
                
                for (let i = 0; i <= colPositions.length; i++) {
                  const x = i === colPositions.length ? 200 : colPositions[i];
                  doc.line(x, tableStartY, x, yPosition);
                }
                
                filteredVessels.forEach((vessel) => {
                  const rowData = [
                    vessel.daId,
                    vessel.vesselName,
                    vessel.port,
                    vessel.country,
                    vessel.eta.split('-').reverse().join('/'),
                    vessel.etd.split('-').reverse().join('/'),
                    vessel.client,
                    vessel.operator
                  ];
                  
                  doc.rect(15, yPosition, 185, rowHeight);
                  
                  doc.setFontSize(7);
                  rowData.forEach((data, colIndex) => {
                    doc.text(data, colPositions[colIndex] + 1, yPosition + 6);
                  });
                  
                  yPosition += rowHeight;
                  
                  for (let i = 0; i <= colPositions.length; i++) {
                    const x = i === colPositions.length ? 200 : colPositions[i];
                    doc.line(x, yPosition - rowHeight, x, yPosition);
                  }
                  
                  if (yPosition > 250) {
                    doc.addPage();
                    yPosition = 20;
                  }
                });
              }
            }
            
            doc.setFontSize(8);
            const currentDate = new Date();
            const dateStr = currentDate.toLocaleDateString('es-ES');
            const timeStr = currentDate.toLocaleTimeString('es-ES');
            doc.text(`Generado el: ${dateStr} a las ${timeStr}`, 20, 280);
            doc.text('WSA Agencies', 20, 288);
            
            console.log('Descargando PDF...');
            const fileName = `reporte-naves-operador-${new Date().toISOString().split('T')[0]}.pdf`;
            doc.save(fileName);
            
            console.log('PDF generado exitosamente');
            
          } catch (pdfError) {
            console.error('Error generando PDF con logo:', pdfError);
            generatePDFWithoutLogo();
          }
        };
        
        img.onerror = function() {
          console.warn('No se pudo cargar el logo, generando PDF sin logo');
          generatePDFWithoutLogo();
        };
        
        img.src = logoImage;
      };
      
      const generatePDFWithoutLogo = () => {
        const pageWidth = doc.internal.pageSize.getWidth();
        
        doc.setFontSize(16);
        const title = 'TOTAL VESSEL\'S BY OPERATOR';
        const titleWidth = doc.getTextWidth(title);
        const titleX = (pageWidth - titleWidth) / 2;
        doc.text(title, titleX, 25);
        
        doc.setFontSize(10);
        doc.text('FROM:', 20, 40);
        doc.text(`${fromDate.split('-').reverse().join('/')}`, 60, 40);
        doc.text('TO:', 120, 40);
        doc.text(`${toDate.split('-').reverse().join('/')}`, 140, 40);
        
        doc.text('TOTAL VESSELS:', 20, 55);
        doc.text(`${totalVessels}`, 80, 55);
        doc.text('OPERATOR:', 120, 55);
        
        const operatorText = selectedOperators.length > 0 ? selectedOperators.join(', ') : 'TODOS';
        const maxWidth = 60;
        
        if (doc.getTextWidth(operatorText) > maxWidth) {
          const words = operatorText.split(', ');
          let currentLine = '';
          let yPos = 55;
          
          for (let i = 0; i < words.length; i++) {
            const testLine = currentLine + (currentLine ? ', ' : '') + words[i];
            if (doc.getTextWidth(testLine) > maxWidth && currentLine) {
              doc.text(currentLine, 150, yPos);
              currentLine = words[i];
              yPos += 10;
            } else {
              currentLine = testLine;
            }
          }
          
          if (currentLine) {
            doc.text(currentLine, 150, yPos);
          }
          
          doc.setFontSize(12);
          doc.text('DETAILS:', 20, Math.max(70, yPos + 15));
          
          if (filteredVessels.length > 0) {
            let yPosition = Math.max(80, yPos + 25);
            
            const tableStartY = yPosition;
            const rowHeight = 8;
            const colWidths = [25, 30, 25, 20, 15, 15, 25, 30];
            const colPositions = [15];
            
            for (let i = 0; i < colWidths.length - 1; i++) {
              colPositions.push(colPositions[i] + colWidths[i]);
            }
            
            const headers = ['DA ID', 'VESSEL', 'PORT', 'COUNTRY', 'ETA', 'ETD', 'CUSTOMER', 'OPERATOR'];
            
            doc.rect(15, yPosition, 185, rowHeight);
            
            doc.setFontSize(8);
            headers.forEach((header, index) => {
              doc.text(header, colPositions[index] + 1, yPosition + 6);
            });
            
            yPosition += rowHeight;
            
            for (let i = 0; i <= colPositions.length; i++) {
              const x = i === colPositions.length ? 200 : colPositions[i];
              doc.line(x, tableStartY, x, yPosition);
            }
            
            filteredVessels.forEach((vessel) => {
              const rowData = [
                vessel.daId,
                vessel.vesselName,
                vessel.port,
                vessel.country,
                vessel.eta.split('-').reverse().join('/'),
                vessel.etd.split('-').reverse().join('/'),
                vessel.client,
                vessel.operator
              ];
              
              doc.rect(15, yPosition, 185, rowHeight);
              
              doc.setFontSize(7);
              rowData.forEach((data, colIndex) => {
                doc.text(data, colPositions[colIndex] + 1, yPosition + 6);
              });
              
              yPosition += rowHeight;
              
              for (let i = 0; i <= colPositions.length; i++) {
                const x = i === colPositions.length ? 200 : colPositions[i];
                doc.line(x, yPosition - rowHeight, x, yPosition);
              }
              
              if (yPosition > 250) {
                doc.addPage();
                yPosition = 20;
              }
            });
          }
        } else {
          doc.text(operatorText, 150, 55);
          
          doc.setFontSize(12);
          doc.text('DETAILS:', 20, 70);
          
          if (filteredVessels.length > 0) {
            let yPosition = 80;
            
            const tableStartY = yPosition;
            const rowHeight = 8;
            const colWidths = [25, 30, 25, 20, 15, 15, 25, 30];
            const colPositions = [15];
            
            for (let i = 0; i < colWidths.length - 1; i++) {
              colPositions.push(colPositions[i] + colWidths[i]);
            }
            
            doc.setFontSize(8);
            const headers = ['DA ID', 'VESSEL', 'PORT', 'COUNTRY', 'ETA', 'ETD', 'CUSTOMER', 'OPERATOR'];
            
            doc.rect(15, yPosition, 185, rowHeight);
            
            headers.forEach((header, index) => {
              doc.text(header, colPositions[index] + 1, yPosition + 6);
            });
            
            yPosition += rowHeight;
            
            for (let i = 0; i <= colPositions.length; i++) {
              const x = i === colPositions.length ? 200 : colPositions[i];
              doc.line(x, tableStartY, x, yPosition);
            }
            
            filteredVessels.forEach((vessel) => {
              const rowData = [
                vessel.daId,
                vessel.vesselName,
                vessel.port,
                vessel.country,
                vessel.eta.split('-').reverse().join('/'),
                vessel.etd.split('-').reverse().join('/'),
                vessel.client,
                vessel.operator
              ];
              
              doc.rect(15, yPosition, 185, rowHeight);
              
              doc.setFontSize(7);
              rowData.forEach((data, colIndex) => {
                doc.text(data, colPositions[colIndex] + 1, yPosition + 6);
              });
              
              yPosition += rowHeight;
              
              for (let i = 0; i <= colPositions.length; i++) {
                const x = i === colPositions.length ? 200 : colPositions[i];
                doc.line(x, yPosition - rowHeight, x, yPosition);
              }
              
              if (yPosition > 250) {
                doc.addPage();
                yPosition = 20;
              }
            });
          }
        }
        
        doc.setFontSize(8);
        const currentDate = new Date();
        const dateStr = currentDate.toLocaleDateString('es-ES');
        const timeStr = currentDate.toLocaleTimeString('es-ES');
        doc.text(`Generado el: ${dateStr} a las ${timeStr}`, 20, 280);
        doc.text('WSA Agencies - Sistema de Gestión de Naves', 20, 288);
        
        const fileName = `reporte-naves-operador-${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(fileName);
      };
      
      generatePDFWithLogo();
      
    } catch (error) {
      console.error('Error completo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-32">
      <Header />
      <div className="bg-[#00335F] py-4 flex justify-between items-center">
        <h1 className="text-[28px] font-bold text-white container mx-auto px-4">Vessel's by Operator Report</h1>
        <button 
          onClick={() => navigate('/admin/generate-reports')}
          className="text-white absolute right-4"
        >
          <ArrowBackIcon />
        </button>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-[#00335F] mb-6 text-center">
            TOTAL VESSEL'S BY OPERATOR
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-bold text-[#00335F] mb-2 flex items-center gap-2">
                <CalendarTodayIcon sx={{ fontSize: 16 }} />
                FROM:
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg font-medium focus:outline-none focus:border-[#00335F]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#00335F] mb-2 flex items-center gap-2">
                <CalendarTodayIcon sx={{ fontSize: 16 }} />
                TO:
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg font-medium focus:outline-none focus:border-[#00335F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-bold text-[#00335F]">TOTAL VESSELS</p>
              <p className="text-2xl font-bold text-[#00335F]">{totalVessels}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-[#00335F]">OPERATOR:</p>
              <p className="text-lg font-medium">
                {selectedOperators.length > 0 ? selectedOperators.join(', ') : 'ALL'}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full md:w-1/2">
              <h3 className="text-lg font-bold text-[#00335F] mb-4 text-center">Seleccionar Operador:</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {allOperators.map((operator) => (
                  <label key={operator} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={selectedOperators.includes(operator)}
                      onChange={() => handleOperatorChange(operator)}
                      className="h-4 w-4 text-[#00335F] border-gray-300 rounded focus:ring-[#00335F]"
                    />
                    <span className="text-sm font-medium">{operator}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setSelectedOperators([])}
              className="px-6 py-3 border-2 border-[#00335F] text-[#00335F] rounded-lg font-bold hover:bg-[#00335F] hover:text-white transition-colors"
            >
              Limpiar Filtros
            </button>
            <button 
              type="button"
              onClick={generatePDF}
              className="px-8 py-3 bg-[#00335F] text-white rounded-lg font-bold hover:bg-[#002347] transition-colors"
            >
              Generar Reporte
            </button>
          </div>
        </div>
      </div>
      
      <NavFooter />
    </div>
  );
};

export default VesselsByOperatorReport;
