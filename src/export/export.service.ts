import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as exceljs from 'exceljs';
import * as tmp from 'tmp';
import { Repository } from 'typeorm';

import { SchoolYear } from '../school-year/entities/school-year.entity';
import { StudentOnActivity } from '../student-on-activity/entities/student-on-activity.entity';
import { StudentOnSchoolYear } from '../student-on-school-year/entities/student-on-school-year.entity';

@Injectable()
export class ExportService {
  constructor(
    @InjectRepository(SchoolYear)
    private readonly schoolYearRepository: Repository<SchoolYear>,
    @InjectRepository(StudentOnActivity)
    private readonly studentOnActivityRepository: Repository<StudentOnActivity>,
    @InjectRepository(StudentOnSchoolYear)
    private readonly studentOnSchoolYearRepository: Repository<StudentOnSchoolYear>,
  ) {}
  async getUsersBySchoolYears() {
    try {
      const dataMap = {};
      const schoolYears = await this.getSchoolYears();

      await Promise.all(
        schoolYears.map(async (schoolYear) => {
          const usersWithActivities = await this.getUsersWithActivities(
            schoolYear,
          );
          dataMap[schoolYear.startYear] = usersWithActivities;
        }),
      );

      const data = this.prepareDataForWorkbook(dataMap);
      const filePath = await this.exportProjectUsers(data);
      return filePath;
    } catch (error) {
      // Handle errors appropriately
      console.error('Error in getUsersBySchoolYears:', error);
      throw error;
    }
  }

  async getSchoolYears() {
    try {
      return await this.schoolYearRepository.find({
        order: { startYear: 'DESC' },
      });
    } catch (error) {
      console.error('Error in getSchoolYears:', error);
      throw error;
    }
  }

  async getUsersWithActivities(schoolYear) {
    try {
      const users = await this.studentOnSchoolYearRepository.find({
        where: { schoolYear: { id: schoolYear.id } },
        order: { dateOfEnrollment: 'DESC' },
        relations: ['user'],
      });

      return await Promise.all(
        users.map(async (studentOnSchoolYear) => {
          const activities = await this.getActivities(studentOnSchoolYear);
          // console.log('getUsersWithActivities, activities:', activities);
          return { user: studentOnSchoolYear, activities };
        }),
      );
    } catch (error) {
      console.error('Error in getUsersWithActivities:', error);
      throw error;
    }
  }

  async getActivities(studentOnSchoolYear) {
    try {
      return await this.studentOnActivityRepository.find({
        where: { studentOnSchoolYear: { id: studentOnSchoolYear.id } },
        order: { createdAt: 'DESC' },
        relations: ['activity', 'activity.projectAssociate'],
      });
    } catch (error) {
      console.error('Error in getActivities:', error);
      throw error;
    }
  }

  async exportProjectUsers(dataMap) {
    try {
      const workbook = await this.createWorkbook(dataMap);
      const filePath = await this.writeWorkbookToFile(workbook);
      return filePath;
    } catch (error) {
      console.error('Error in exportProjectUsers:', error);
      throw error;
    }
  }

  async createWorkbook(dataMap) {
    const book = new exceljs.Workbook();
    for (const key in dataMap) {
      if (dataMap.hasOwnProperty(key)) {
        const rows = dataMap[key];
        await this.createWorkBookWithRows(book, key, rows);
      }
    }

    book.eachSheet((sheet) => {
      sheet.eachRow((row, rowNumber) => {
        row.height = 20;
        row.alignment = { vertical: 'middle' };
        row.eachCell((cell) => {
          if (rowNumber % 2 !== 0) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'edf3fa' },
            };
          }

          cell.font = {
            name: 'Arial',
            size: 13,
            bold: rowNumber === 1,
          };
        });
      });
    });

    return book;
  }

  async writeWorkbookToFile(workbook: exceljs.Workbook) {
    return new Promise<string>((resolve, reject) => {
      tmp.file(
        {
          discardDescriptor: true,
          prefix: 'users',
          postfix: '.xlsx',
          mode: parseInt('0777', 8),
        },
        async (err, path: string) => {
          if (err) {
            console.error('Error in writeWorkbookToFile:', err);
            reject(new BadRequestException());
          } else {
            await workbook.xlsx.writeFile(path);
            resolve(path);
          }
        },
      );
    });
  }

  async createWorkBookWithRows(
    book: exceljs.Workbook,
    workbookName: string,
    rows: any[],
  ) {
    const sheet = book.addWorksheet(
      this.getWorksheetNameFromSchoolYear(workbookName),
    );
    sheet.columns = [
      { header: 'Ime skrbnika' },
      { header: 'Email' },
      { header: 'Mobitel' },
      { header: 'Ime djeteta' },
      { header: 'Datum rodenja' },
      { header: 'OIB' },
      { header: 'Adresa stanovanja' },
      { header: 'Osnovna skola' },
      { header: 'Datum upisa na skolsku godinu' },
      { header: 'Status upisa na skolsku godinu' },

      { header: 'Aktivnost' },
      { header: 'Klub' },
      { header: 'Cijena' },
      { header: 'Ugovorena cijena' },
      { header: 'Datum upisa' },
      { header: 'Datum ispisa' },
      { header: 'Status aktivnosti' },

      { header: 'Aktivnost' },
      { header: 'Klub' },
      { header: 'Cijena' },
      { header: 'Ugovorena cijena' },
      { header: 'Datum upisa' },
      { header: 'Datum ispisa' },
      { header: 'Status aktivnosti' },

      { header: 'Aktivnost' },
      { header: 'Klub' },
      { header: 'Cijena' },
      { header: 'Ugovorena cijena' },
      { header: 'Datum upisa' },
      { header: 'Datum ispisa' },
      { header: 'Status aktivnosti' },

      { header: 'Aktivnost' },
      { header: 'Klub' },
      { header: 'Cijena' },
      { header: 'Ugovorena cijena' },
      { header: 'Datum upisa' },
      { header: 'Datum ispisa' },
      { header: 'Status aktivnosti' },
    ];
    sheet.columns.forEach((column) => {
      column.width = column.header.length < 25 ? 25 : column.header.length;
    });

    sheet.addRows(rows);
  }
  getWorksheetNameFromSchoolYear(schoolYear: string) {
    const startYear = parseInt(schoolYear);
    const endYear = startYear + 1;
    return `${startYear} - ${endYear}`;
  }

  prepareDataForWorkbook(dataMap) {
    const preparedData = {};
    for (const key in dataMap) {
      if (dataMap.hasOwnProperty(key)) {
        const schoolYearData = dataMap[key];
        const formattedData = schoolYearData.map(({ user, activities }) => {
          const rowData = [
            `${user.user.guardianName} ${user.user.guardianSurname}`,
            user.user.email,
            user.user.mobilePhone,
            `${user.user.childName} ${user.user.childSurname}`,
            this.convertISODateToHumanReadableDate(user.user.dateOfBirth),
            user.user.oib,
            `${user.user.address}, ${user.user.city}`,
            user.user.school,
            user.dateOfEnrollment,
            user.status,
          ];
          activities.forEach((activity) => {
            rowData.push(
              activity.activity.activityName,
              activity.activity.projectAssociate.clubName,
              activity.activity.activityPrice !== 0
                ? activity.activity.activityPrice + ' EUR'
                : 'Besplatno',
              activity.actualActivityCost !== 0
                ? activity.actualActivityCost + ' EUR'
                : 'Besplatno',
              this.convertISODateToHumanReadableDate(activity.enrollmentDate),
              this.convertISODateToHumanReadableDate(activity.unenrollmentDate),
              activity.activityStatus,
            );
          });
          return rowData;
        });
        preparedData[key] = formattedData;
      }
    }
    return preparedData;
  }

  convertISODateToHumanReadableDate(inputDate: Date): string | undefined {
    if (!(inputDate instanceof Date) || isNaN(inputDate.getTime())) return;

    try {
      const year = inputDate.getUTCFullYear();
      const month = inputDate.getUTCMonth() + 1;
      const day = inputDate.getUTCDate();
      return `${day.toString().padStart(2, '0')}.${month
        .toString()
        .padStart(2, '0')}.${year}`;
    } catch (e) {
      console.log('error converting date', e);
    }

    return undefined;
  }
}
