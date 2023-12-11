import Router from './pages/Router';
import GlobalStyle from './styled/GlobalStyle';
function App() {
  // fakeData 추가 부분
  // const addDocPromises = dbData.map(async (docData) => {
  //   const docRef = await addDoc(collection(db, 'places'), { id: uuid(), ...docData });
  //   console.log('문서 추가 성공, ', docRef.id);
  // });

  // Promise.all(addDocPromises)
  //   .then(() => {
  //     console.log('일괄 처리 성공');
  //   })
  //   .catch((error) => {
  //     console.log('일괄 처리 오류: ', error);
  //   });
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
