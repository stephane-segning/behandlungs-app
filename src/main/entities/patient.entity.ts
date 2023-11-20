import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'patients' })
export class PatientEntity {
  @PrimaryGeneratedColumn('increment', { name: 'pat_id' })
  id: number

  @Column({ name: 'id_number', type: 'varchar' })
  idNumber: string
}
