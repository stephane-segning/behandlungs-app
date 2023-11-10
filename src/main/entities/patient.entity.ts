import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'patients' })
export class PatientEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'pat_id' })
  id: string

  @Column({ name: 'id_number', type: 'varchar' })
  idNumber: string
}
