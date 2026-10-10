export interface LoginDataFile {
  validUser: { username: string; password: string };
  invalidUser: { username: string; password: string };
}

export interface MedicineDataFile {
  medicineName: {
    searchTerm: string;
    name: string;
  };
}
