/**
 * 演示用模拟数据。
 * 本文件中的所有线路、班次与到站时间均不代表真实运营信息。
 */
window.SHUTTLE_MOCK_DATA = {
  walkingMinutes: 6,
  bufferMinutes: 1,
  routes: [
    {
      id: "line-1",
      number: "1",
      nameZh: "1号线",
      nameEn: "Line 1",
      destinationZh: "下园",
      destinationEn: "Xiayuan",
      arrivals: [8, 18, 28],
      intervalMinutes: 10,
      color: "#21d7c5"
    },
    {
      id: "line-2",
      number: "2",
      nameZh: "2号线",
      nameEn: "Line 2",
      destinationZh: "下园",
      destinationEn: "Xiayuan",
      arrivals: [4, 14, 24],
      intervalMinutes: 10,
      color: "#5ba8ff"
    },
    {
      id: "line-3",
      number: "3",
      nameZh: "3号线",
      nameEn: "Line 3",
      destinationZh: "下园",
      destinationEn: "Xiayuan",
      arrivals: [10, 20, 30],
      intervalMinutes: 10,
      color: "#9b8cff"
    }
  ]
};
