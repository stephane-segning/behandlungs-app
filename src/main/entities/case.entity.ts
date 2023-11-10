import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CaseStepEntity } from './case-step.entity'
import { PatientEntity } from './patient.entity'

@Entity({ name: 'cases' })
export class CaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'case_id' })
  id: string

  @OneToMany(() => CaseStepEntity, (caseStep) => caseStep.caseE, { lazy: true })
  steps: CaseStepEntity[]

  @ManyToOne(() => PatientEntity, { eager: true })
  @JoinColumn({ name: 'pat_id' })
  patient: PatientEntity

  @Column({ name: 'date', update: false, type: 'date' })
  date: string

  @Column({ name: 'arrived_by', update: false, type: 'varchar' })
  arrivedBy: string
}
