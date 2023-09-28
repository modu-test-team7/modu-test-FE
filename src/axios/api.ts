// interface SignUp extends SignIn {
//   email: string;
//   nickname: string;
// }
// interface SignIn {
//   name: string;
//   password: string;
// }
// const signIn: SignIn = {
//   username: 'asdf',
//   password: 'adsf',
// };
// const signUp: SignUp = {
//   username,
//   password,
//   email,
//   nickname,
// };
// export interface Test {
//   title: string;
//   content: string;
//   image: string;
//   category: string;
//   // questions: TestQ[];
//   questions: Array<TestQ>;
// }
// export interface TestQ {
//   title: string;
//   image: string;
//   choices: TestQC[];
// }
// export interface TestQC {
//   content: string;
//   images: string;
// }
// const postTest = async (test: Test) => {
//   const result = await instance.post('/test/testMakeForm', test);
//   return result;
// };
// interface EditTest {
//   title: string;
//   content: string;
//   image: string;
// }
// const data = {
//   testId: 1,
//   testInfo: {},
// };
// const editTest = async ({ testId, testInfo }: { testId: number; testInfo: EditTest }) => {
//   const result = await instance.post(`/test/${testId}`, testInfo);
//   return result;
// };
// interface TestUser {
//   userChoices: number[];
// }
// type stringAry = string[];
