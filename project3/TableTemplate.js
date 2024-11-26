class TableTemplate {
    static fillIn(id, dictionary, columnName) {
      // 獲取表格元素
      const table = document.getElementById(id);
      if (!table) return;
  

      const headerRow = table.rows[0];
      const headers = Array.from(headerRow.cells);
      headers.forEach((cell) => {
        const tp = new TemplateProcessor(cell.textContent);
        cell.textContent = tp.fillIn(dictionary);
      });
  

      let targetColumnIndex = -1;
      if (columnName) {
        targetColumnIndex = headers.findIndex(
          (header) => header.textContent === columnName
        );
        if (targetColumnIndex === -1) return;
      }
  
      // 處理內容
      Array.from(table.rows).slice(1).forEach((row) => {
        const cells = Array.from(row.cells);
        cells.forEach((cell, index) => {
          if (!columnName || index === targetColumnIndex) {
            const tp = new TemplateProcessor(cell.textContent);
            cell.textContent = tp.fillIn(dictionary);
          }
        });
      });
  
      if (table.style.visibility === "hidden") {
        table.style.visibility = "visible";
        console.log("WTF");
      }
    }
  }
  