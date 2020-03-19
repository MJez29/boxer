// Current tests should test aliases.ts

// import { isAlias, isAliasArray } from "./storage";

// describe("Storage", () => {
//   describe("isAlias", () => {
//     it("returns false when not given an object", () => {
//       expect(isAlias(5)).toBeFalsy();
//     });

//     it("returns false when given null", () => {
//       expect(isAlias(null)).toBeFalsy();
//     });

//     it("returns false if name missing", () => {
//       expect(isAlias({ link: "link" })).toBeFalsy();
//     });

//     it("returns false if link is missing", () => {
//       expect(isAlias({ name: "name" })).toBeFalsy();
//     });

//     it("returns true when given alias", () => {
//       expect(isAlias({ name: "name", link: "link" }));
//     });
//   });

//   describe("isAliasArray", () => {
//     it("returns false when not given array", () => {
//       const a = 5;
//       expect(isAliasArray(a)).toBeFalsy();
//     });

//     it("returns false when not given array of aliases", () => {
//       const a = [5, null, "foo"];
//       expect(isAliasArray(a)).toBeFalsy();
//     });

//     it("returns true when given array of aliases", () => {
//       const a = [
//         { name: "name", link: "link" },
//         { name: "link", link: "name" }
//       ];
//       expect(isAliasArray(a)).toBeTruthy();
//     });
//   });
// });
